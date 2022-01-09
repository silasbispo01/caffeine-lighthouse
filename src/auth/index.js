import jwt from 'jsonwebtoken';

const isUser = (req, res, next) => {
  const token = req.headers['authorization'].replace(/^Bearer\s/, '');

  if(!token) return res.status(401).json({ auth: false, message: 'No token provided'});

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token'});

    req.userId = decoded.id;
    next();
  })

}

export default { isUser }