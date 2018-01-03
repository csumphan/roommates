module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Field "firstName" is required',
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: 'Field "lastName" is required',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: Sequelize.STRING(72),
      defaultValue: '',
      validate: {
        notEmpty: {
          msg: 'Password is required and cannot be empty',
        },
      },
    },
    profilePicture: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }
);
  User.prototype.toJSON = function() {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  User.prototype.toJWTPayload = function() {
    const values = Object.assign({}, this.get());

    return {
      id: values.id,
      email: values.email
    };
  };

  return User;
};
