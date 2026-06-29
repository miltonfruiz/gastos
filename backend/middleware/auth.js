const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = decoded;
    next();
  } catch (error) {
    res.status(401).send({ mensaje: 'Acceso no autorizado' });
  }
};

module.exports = authMiddleware;