import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecepientController from './app/controllers/RecepientController';

import authMiddleware from './app/middlewares/auth';

// import User from './app/models/User';

const routes = new Router();

routes.get('/', UserController.store);
// routes.post('/users', UserController.insert);
routes.post('/sessions', SessionController.store); // login
routes.post('/recepients', authMiddleware, RecepientController.store);
routes.put('/recepients/:id', authMiddleware, RecepientController.update);

export default routes;
