const express = require('express');
const router = express.Router();
const model = require('../models');

const UserModel = model.Users;
const sequelize = model.sequelize;

/* GET users listing. */
router.get('/', function(req, res, next) {
  UserModel.findAll()
  .then(result => res.json(result))
  .catch(error => res.send(error));
});

router.post('/', function(req, res, next) {
  const body = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    password: req.body.password.trim()
  };
  
  UserModel.create(body)
  .then(user => res.json(user))
  .catch(error => res.send(error));
});

module.exports = router;
