import { Model, Sequelize } from 'sequelize'; // Sequelize tem q ficar fora das chaves

class DeliveryProblems extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
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
