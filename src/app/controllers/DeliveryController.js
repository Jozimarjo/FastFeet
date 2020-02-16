import * as Yup from 'yup';
import Deliverys from '../models/Deliverys';
import Recepients from '../models/Recepients';
import Queue from '../../lib/Queue';
import CancellationMail from '../jobs/CancellationMail';

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
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });

    const delivery = await Deliverys.create({
      product,
      recipient_id,
      deliveryman_id,
      signature_id,
    });
    console.log(delivery);
    await Queue.add(CancellationMail.key, {
      delivery,
    });

    return res.json(delivery);
  }
}
export default new DeliveryController();
