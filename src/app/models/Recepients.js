// nome do destinatário e campos de endereço: rua, número, complemento, estado, cidade e CEP.
import Sequelize, { Model } from 'sequelize'; // Sequelize tem q ficar fora das chaves

class Recepients extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}
export default Recepients;
