const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth');
const { User } = require('../../models');

class SessionController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      // Verifica se o usuário existe
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      //  Verifica se a senha está correta
      const passwordMatches = await bcrypt.compare(password, user.password_hash);
      if (!passwordMatches) {
        return res.status(401).json({ error: 'Password does not match' });
      }

      const { id, name } = user;

      //  Gera o token
      const token = jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return res.json({
        user: { id, name, email },
        token,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Login failed', details: error.message });
    }
  }
}

module.exports = new SessionController();