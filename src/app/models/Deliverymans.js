import { Model, Sequelize } from 'sequelize'; // Sequelize tem q ficar fora das chaves

class DeliveryMans extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}
export default DeliveryMans;
