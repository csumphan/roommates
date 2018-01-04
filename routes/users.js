const express = require('express');
const router = express.Router();
const jwt = require('../libs/jwt');
const httpStatus = require('http-status-codes');
const model = require('../models');

const UserModel = model.Users;
const sequelize = model.sequelize;


/* GET users listing. */
router.get('/', function(req, res, next) {
  jwt.createToken();

  UserModel.findAll()
  .then(result => res.json(result))
  .catch(error => res.send(error));
});

router.post('/login', function(req, res, next) {
  if (!req.body.email || !req.body.email.trim()) {
    res.status(httpStatus.BAD_REQUEST).json({error: 'ERROR MSG IN PROGRESS'});
  }
  if (!req.body.password || !req.body.password.trim()) {
    res.status(httpStatus.BAD_REQUEST).json({error: 'ERROR MSG IN PROGRESS'});
  }
  const body = {
    email: req.body.email.trim(),
    password: req.body.password.trim()
  };

  UserModel.findOne({where: body})
  .then(user => {
    if (!user) {
      res.status(httpStatus.UNAUTHORIZED).json({error: 'Invalid login credentials'});
      return;
    }

    const userObj = user.toJSON();
    const jwtObj = user.toJWTPayload();
    const token = jwt.createToken(jwtObj);

    userObj.jwt = token;

    res.status(httpStatus.ACCEPTED).json({data: userObj});
  })
  .catch(error => res.send(error));
});

router.post('/', function(req, res, next) {
  if (!req.body.email || !req.body.email.trim()) {
    res.status(httpStatus.BAD_REQUEST).json({error: 'ERROR MSG IN PROGRESS'});
    return;
  }
  if (!req.body.firstName || !req.body.firstName.trim()) {
    res.status(httpStatus.BAD_REQUEST).json({error: 'ERROR MSG IN PROGRESS'});
    return;
  }
  if (!req.body.lastName || !req.body.lastName.trim()) {
    res.status(httpStatus.BAD_REQUEST).json({error: 'ERROR MSG IN PROGRESS'});
    return;
  }
  if (!req.body.password || !req.body.password.trim()) {
    res.status(httpStatus.BAD_REQUEST).json({error: 'ERROR MSG IN PROGRESS'});
    return;
  }

  const body = {
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName.trim(),
    email: req.body.email.trim(),
    password: req.body.password.trim()
  };

  UserModel.create(body)
  .then(user => {
    const userObj = user.toJSON();
    const jwtObj = user.toJWTPayload();
    const token = jwt.createToken(jwtObj);

    userObj.jwt = token;

    res.status(httpStatus.CREATED).json({data: userObj});
  })
  .catch(error => res.send(error));
});

module.exports = router;
