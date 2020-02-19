import { Model, Sequelize } from 'sequelize'; // Sequelize tem q ficar fora das chaves

class DeliveryProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Files, {
      foreignKey: 'delivery_id',
      as: 'deliverys',
    });
  }
}
export default DeliveryProblems;
