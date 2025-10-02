module.exports = {
  secret: process.env.JWT_SECRET,
  expiresIn: '7d', // Token expira em 7 dias
};