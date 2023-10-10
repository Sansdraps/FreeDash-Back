const jwt = require('jsonwebtoken');

const jwtAuth = (req, res, next) => {

  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userId = data.id;
    next();
  } catch (error) {
    return res.status(401).send("Vous n'êtes pas autorisé à accéder à cette ressource.");
  }
};

module.exports = jwtAuth;
