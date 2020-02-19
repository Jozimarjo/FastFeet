import DeliveryProblems from '../models/DeliveryProblems';
import Deliverys from '../models/Deliverys';
import Queue from '../../lib/Queue';
import Cancellation from '../jobs/Cancellation';
import Deliveryman from '../models/Deliverymans';
import Recepients from '../models/Recepients';

class DeliveryProblemsController {
  async show(req, res) {
    const problems = await DeliveryProblems.findAll();
    return res.json(problems);
  }

  async index(req, res) {
    const { id } = req.params;
    const problems = await DeliveryProblems.findAll({
      where: {
        delivery_id: id,
      },
    });
    return res.json(problems);
  }

  async store(req, res) {
    const { id } = req.params;
    const { description } = req.body;
    const problem = await DeliveryProblems.create({
      description,
      delivery_id: id,
    });
    return res.json(problem);
  }

  async delete(req, res) {
    const { id } = req.params;
    const problem = await DeliveryProblems.findByPk(id);
    const { delivery_id } = problem;
    const delivery = await Deliverys.findOne({
      where: {
        id: delivery_id,
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
    await delivery.update({ canceled_at: new Date() });
    await Queue.add(Cancellation.key, {
      delivery,
    });
    return res.json(delivery);
  }
}

export default new DeliveryProblemsController();
