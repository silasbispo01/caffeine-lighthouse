import { prisma } from "../db/index.js"

export const createBenchmark = async (req, res) => {
  let urlArray = [];
  let { name, urls } = req.body; 
  
  urls.map((obj) => {
    return urlArray.push(JSON.stringify(obj));
  })

  try {
    const User = await prisma.users.findUnique({where: { id: req.userId }});

    if(!User) return res.status(404).json({ message: "Faça login para criar um benchmark"});
    
    let UsersBenchmark = await prisma.benchmarks.findMany({
      where: {
        ownersId: {
          hasSome: User.id
        },
        name: name,
      }
    })

    if(UsersBenchmark) return res.status(400).json({ message: "Vocẽ já possui um benchmark com esse nome"});
    
    const Benchmark = await prisma.benchmarks.create({
      data: {
        name: name,
        ownersId: [User.id],
        urls: urlArray,
      }
    })

    return res.json(Benchmark);
  } catch (err) {
    res.json({erro: err.message })
  }
}

export const userBenchmark = async (req, res) => {
  try {
    const Benchmarks = await prisma.benchmarks.findMany({
      where: {
        ownersId: {
          hasSome: req.userId
        },
      }
    })

    if(Benchmarks == 0) return res.status(404).json("Nenhum benchmark foi encontrado")

    console.log(Benchmarks.length)

    res.json(Benchmarks);
  } catch (err) {
    res.json({erro: err.message })
  }
}