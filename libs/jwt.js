const jwt = require('jsonwebtoken');
const model = require('../models');

const UserModel = model.Users;

const jwtConfig = {
  expiresIn: "7d",
  issuer: "roommates",
  audience: "roommatesClient",
  secret: "$,cN}IF6:8qIJzM"
};

function createToken(obj) {
  const jwtOptions = {
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience
  };

  const token = jwt.sign(obj, jwtConfig.secret, jwtOptions);

  return token;
}
//middleware used with routes to authenicate jwt
function authenicate(req, res, next) {

}


module.exports = {
  createToken,
  authenicate
};
