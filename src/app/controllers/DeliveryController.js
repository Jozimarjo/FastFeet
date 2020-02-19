import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Deliverys from '../models/Deliverys';
import Recepients from '../models/Recepients';
import Deliveryman from '../models/Deliverymans';
import Queue from '../../lib/Queue';
import DeliveryMail from '../jobs/DeliveryMail';

class DeliveryController {
  /**
   * lista todas as entregas nao finalizadas ou canceladas  de um entregador
   */
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
    const { product, deliveryman_id, recipient_id, signature_id } = req.body;

    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const delivery = await Deliverys.create({
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
    });

    const result = await Deliverys.findOne({
      where: {
        recipient_id,
      },
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Recepients,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
    });
    await Queue.add(DeliveryMail.key, {
      result,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const { id } = req.params;
    const deliverys = await Deliverys.findByPk(id);

    const schema = Yup.object().shape({
      product: Yup.string(),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });
    const delive = await deliverys.update(req.body);
    return res.json(delive);
  }

  async delete(req, res) {
    const { id } = req.params;
    const deliverys = await Deliverys.findByPk(id);
    deliverys.destroy();
    return res.json(deliverys);
  }

  /**
   * lista todas as entregas finalizadas de um entregador
   */
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
}
export default new DeliveryController();
