import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Deliveryman from '../models/Deliverymans';
import Deliverys from '../models/Deliverys';

class DeliverymanController {
  async show(req, res) {
    const { id } = req.params;
    const deliverymans = await Deliverys.findAll({
      where: {
        deliveryman_id: id,
        end_date: {
          [Op.between]: [
            startOfDay(new Date('2020-01-17')),
            endOfDay(new Date()),
          ],
        },
      },
    });

    return res.json(deliverymans);
  }

  async index(req, res) {
    const { id } = req.params;
    const deliverymans = await Deliverys.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
    });

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
