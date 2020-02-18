import Deliverys from '../models/Deliverys';
import Files from '../models/Files';

class DeliveryFinishController {
  async store(req, res) {
    const { id } = req.params;
    const { originalname: name, filename: path } = req.file;
    const file = await Files.create({ name, path });
    const delivery = await Deliverys.findByPk(id);

    delivery.update({
      signature_id: file.id,
      end_date: new Date(),
    });
    return res.json(file);
  }
}

export default new DeliveryFinishController();
