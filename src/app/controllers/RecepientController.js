import * as Yup from 'yup';
import Recipents from '../models/Recepients';

class RecepientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Validation Fails' });
    const { name, street, number, complement, state, city, cep } = req.body;
    const rec = await Recipents.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      cep,
    });
    return res.json(rec);
  }
}
export default new RecepientController();
