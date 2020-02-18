import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecepientController from './app/controllers/RecepientController';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryStartController from './app/controllers/DeliveryStartController';
import DeliveryFinishController from './app/controllers/DeliveryFinishController';

// import User from './app/models/User';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', UserController.store);
// routes.post('/users', UserController.insert);
routes.post('/sessions', SessionController.store); // login

routes.post('/recepients', authMiddleware, RecepientController.store);
routes.put('/recepients/:id', authMiddleware, RecepientController.update);

routes.get('/deliverymans/:id', authMiddleware, DeliverymanController.show); // encomendas ja entregues
routes.get(
  '/deliverymans/:id/deliveries',
  authMiddleware,
  DeliverymanController.index
); // encomendas atribuidas a ele, que não estejam entregues ou canceladas;
routes.post('/deliverymans', authMiddleware, DeliverymanController.store);
routes.put('/deliverymans/:id', authMiddleware, DeliverymanController.update);

routes.get('/deliverys', authMiddleware, DeliveryController.index);
routes.post('/deliverys', authMiddleware, DeliveryController.store);
routes.put('/deliverys/:id', authMiddleware, DeliveryController.update);
routes.delete('/deliverys/:id', authMiddleware, DeliveryController.delete);

routes.put('/deliverysStart/:id', DeliveryStartController.update);

routes.put(
  '/deliveryFinish/:id',
  upload.single('file'),
  DeliveryFinishController.store
);

routes.post('/files', upload.single('file'), FileController.store);

routes.delete(
  '/deliverymans/:id',
  authMiddleware,
  DeliverymanController.delete
);

export default routes;
