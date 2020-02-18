import { Model, Sequelize } from 'sequelize'; // Sequelize tem q ficar fora das chaves

class Deliverys extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
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
