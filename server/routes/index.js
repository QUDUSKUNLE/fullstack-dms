import usersController from '../controllers/users';
import documentsController from '../controllers/documents';
import auth from '../middlewares/auth';

export default (app) => {
  // Users API Endpoint
  app.post('/users', usersController.create);
  app.get('/users', usersController.list);
  app.get('/users/:id', usersController.retrieve);
  app.put('/users/:id', usersController.update);
  app.delete('/users/:id', usersController.destroy);

  // Authentication Endpoint
  app.post('/users/login', usersController.login);

  // Documents API Endpoints
  app.post('/documents', auth.verifyToken, documentsController.create);
  app.get('/documents', auth.verifyToken, documentsController.list);
  app.get('/documents/:id', auth.verifyToken, documentsController.retrieve);
  app.put('/documents/:id', auth.verifyToken, documentsController.update);
  app.get('/documents/search', auth.verifyToken, documentsController.search);
  app.delete('/documents/:id', auth.verifyToken, documentsController.destroy);
};
