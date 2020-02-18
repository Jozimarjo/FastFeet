import Deliverys from '../models/Deliverys';

class DeliveryEndController {
  async update(req, res) {
    const { id } = req.params;
    // const { start_date, end_date } = req.body;
    const delivery = await Deliverys.findByPk(id);
    if (!delivery)
      return res.status(400).json({ error: 'Nenhuma entrega encontrada' });
    delivery.update(req.body);
    return res.json(delivery);
  }
}

export default new DeliveryEndController();
