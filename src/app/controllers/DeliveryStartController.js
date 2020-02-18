import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Deliverys from '../models/Deliverys';

class DeliveryStartController {
  async update(req, res) {
    const { id } = req.params;
    // const { start_date, end_date } = req.body;
    const delivery = await Deliverys.findByPk(id);
    if (!delivery)
      return res.status(400).json({ error: 'Nenhuma entrega encontrada' });

    const hours = new Date().getHours();

    if (hours < 8 || hours > 18)
      return res.status(400).json({
        error: 'As entregas so podem ser feitas de 08:00h as 18:00h ',
      });

    const checkFiveDeliverys = await Deliverys.findAll({
      where: {
        start_date: {
          [Op.between]: [
            startOfDay(new Date().valueOf()),
            endOfDay(new Date().valueOf()),
          ],
        },
      },
    });

    if (checkFiveDeliverys.length >= 5)
      return res
        .status(400)
        .json({ error: 'Numero maximo de entregas foi atingido' });

    delivery.update(req.body);
    return res.json(delivery);
  }
}

export default new DeliveryStartController();
