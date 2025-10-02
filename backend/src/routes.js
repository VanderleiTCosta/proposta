const { Router } = require('express');
const ClientController = require('./controllers/ClientController');
const ProposalController = require('./controllers/ProposalController');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController');

const routes = new Router();

routes.get('/', (req, res) => {
  res.send('API Online!');
});

// --- Rotas de Autenticação ---
routes.post('/users', UserController.store); // Rota para criar nosso usuário de teste
routes.post('/sessions', SessionController.store); // Rota de Login

// Rotas para Clientes
routes.post('/clients', ClientController.store);
routes.get('/clients', ClientController.index);
routes.get('/clients/:id', ClientController.show);
routes.put('/clients/:id', ClientController.update);
routes.delete('/clients/:id', ClientController.destroy);

// Rotas para Propostas
routes.post('/proposals', ProposalController.store);
routes.get('/proposals', ProposalController.index);
routes.get('/proposals/:id', ProposalController.show);
routes.put('/proposals/:id', ProposalController.update);
routes.delete('/proposals/:id', ProposalController.destroy);

// Rota Pública
routes.get('/view/proposal/:hash', ProposalController.view);
routes.get('/proposal/:hash', ProposalController.view);


module.exports = routes;