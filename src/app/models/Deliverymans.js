import { Model, Sequelize } from 'sequelize'; // Sequelize tem q ficar fora das chaves

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: 'deliveryman',
        freezeTableName: true,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Files, { foreignKey: 'avatar_id', as: 'avatar' });
  }
}
export default Deliveryman;
