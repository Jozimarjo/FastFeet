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
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

// import User from './app/models/User';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', UserController.store);
// routes.post('/users', UserController.insert);
routes.post('/sessions', SessionController.store); // login

routes.post('/recepients', authMiddleware, RecepientController.store);
routes.put('/recepients/:id', authMiddleware, RecepientController.update);

routes.get('/deliverymans', authMiddleware, DeliverymanController.show);
routes.get('/deliverymans/:id', authMiddleware, DeliverymanController.index);
routes.put('/deliverymans/:id', authMiddleware, DeliverymanController.update);
routes.delete(
  '/deliverymans/:id',
  authMiddleware,
  DeliverymanController.delete
);

routes.get('/deliverys', authMiddleware, DeliveryController.index);
routes.post('/deliverys', authMiddleware, DeliveryController.store);
routes.put('/deliverys/:id', authMiddleware, DeliveryController.update);
routes.delete('/deliverys/:id', authMiddleware, DeliveryController.delete);

/**
 *  // encomendas atribuidas a um entregador, que não estejam entregues ou canceladas;
 */
routes.get(
  '/deliverymans/:id/deliveries/not_delivered',
  authMiddleware,
  DeliveryController.index
);

/**
 *  encomendas ja entregues
 */
routes.get(
  '/deliverymans/:id/deliveries',
  authMiddleware,
  DeliveryController.show
);

routes.put('/deliverysStart/:id', DeliveryStartController.update);

routes.put(
  '/deliveryFinish/:id',
  upload.single('file'),
  DeliveryFinishController.store
);

routes.get('/delivery/:id/problems', DeliveryProblemsController.index);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
