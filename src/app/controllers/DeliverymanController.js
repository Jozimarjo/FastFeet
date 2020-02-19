import * as Yup from 'yup';

import Deliveryman from '../models/Deliverymans';

class DeliverymanController {
  async show(req, res) {
    const deliverymen = await Deliveryman.findAll();
    res.json(deliverymen);
  }

  async index(req, res) {
    const { id } = req.params;
    const deliverymans = await Deliveryman.findByPk(id);

    return res.json(deliverymans);
  }

  async store(req, res) {
    const { name, email, avatar_id } = req.body;

    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const delivery = await Deliveryman.create({
      name,
      email,
      avatar_id,
    });
    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;
    const deliverymans = await Deliveryman.findByPk(id);

    if (!deliverymans)
      return res.status(400).json({ error: 'Entregador não encontrado' });

    const schema = Yup.object().shape({
      email: Yup.string().email(),
      name: Yup.string(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const rec = await deliverymans.update(req.body);
    return res.json(rec);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliverymans = await Deliveryman.findByPk(id);

    if (!deliverymans)
      return res.status(400).json({ error: 'Entregador não encontrado' });

    await deliverymans.destroy();
    return res.json(deliverymans);
  }
}
export default new DeliverymanController();
