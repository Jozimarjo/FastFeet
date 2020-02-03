import User from '../models/Users';

class UserController {
  async store(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }

  async insert(req, res) {
    const { name, email, password_hash } = req.body;
    const user = await User.create({
      name,
      email,
      password_hash,
    });
    return res.json(user);
  }
}
export default new UserController();
