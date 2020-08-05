const express = require('express')
const UserController = require('./controllers/UserController')
const AddressController = require('./controllers/AddressController')
const TechController = require('./controllers/TechController')

const routes = express.Router();


routes.get('/users', UserController.index)
routes.post('/user', UserController.store);
routes.get('/user/:id', UserController.show);

routes.get('/user/:user_id/address', AddressController.index);
routes.post('/user/:user_id/address', AddressController.store);

routes.get('/user/:user_id/techs', TechController.index);
routes.post('/user/:user_id/tech', TechController.store);
routes.delete('/user/:user_id/tech', TechController.delete);

module.exports = routes;    