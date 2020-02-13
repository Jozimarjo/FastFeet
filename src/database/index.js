import Sequelize from 'sequelize';

import User from '../app/models/Users';

import Recipients from '../app/models/Recepients';

import databaseConfig from '../config/database';
import DeliveryMans from '../app/models/Deliverymans';
import File from '../app/models/Files';

const models = [User, Recipients, DeliveryMans, File];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}
export default new Database();
