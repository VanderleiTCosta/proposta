const { User } = require('../../models');
const bcrypt = require('bcryptjs');

class UserController {
  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const password_hash = await bcrypt.hash(password, 8); // Criptografa a senha

      const user = await User.create({ name, email, password_hash });
      return res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      return res.status(400).json({ error: 'Failed to create user', details: error.message });
    }
  }
}

module.exports = new UserController();