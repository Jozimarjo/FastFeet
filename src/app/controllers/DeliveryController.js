import * as Yup from 'yup';
import Deliverys from '../models/Deliverys';
import Recepients from '../models/Recepients';
import Deliveryman from '../models/Deliverymans';
import Queue from '../../lib/Queue';
import DeliveryMail from '../jobs/DeliveryMail';

class DeliveryController {
  async index(req, res) {
    const deliverys = await Deliverys.findAll();

    return res.json(deliverys);
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
}
export default new DeliveryController();
