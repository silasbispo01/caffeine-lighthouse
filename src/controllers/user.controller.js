import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { app } from "../app.js";
import { prisma } from "../db/index.js"

export const createUser = async (req, res) => {
  let { name, password } = req.body;
  
  try {
    let encryptedPassword = await bcrypt.hash(password, 12);

    let user = await prisma.users.findUnique({ where: { name }});
    
    if(user) {
      res.status(403); 
      throw new Error('Usuário com mesmo nome já existe')
    }
    
    const newUser = await prisma.users.create({
      data: {
        name,
        password: encryptedPassword
      }
    })
    
    app.emit('@user:created');
    res.send(newUser);
  } catch(err) {
    res.json({erro: err.message});
  }
}

export const loginUser = async (req, res) => {
  let { name, password } = req.body;

  try {
    let user = await prisma.users.findUnique({ where: { name }});

    if(!user) {
      res.status(404);
      throw new Error('Usuário não encontrado');
    }
    
    let match = await bcrypt.compare(password, user.password);
    
    if(match) {
      const id = user.id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3000
      })

      res.json({
        token: token
      })
    } else {
      res.status(401);
      throw new Error('Credenciais incorretas');
    }
  } catch (err) {
    res.json({erro: err.message});
  }
}