import { Model, Sequelize } from 'sequelize'; // Sequelize tem q ficar fora das chaves

class Deliverys extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    console.log('=========== ', models);
    this.belongsTo(models.Files, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
    this.belongsTo(models.Recepients, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
  }
}
export default Deliverys;
