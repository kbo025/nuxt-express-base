'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo 'name' precisa ser preenchido." },
        notNull: { msg: 'O campo "name" precisa ser preenchido' },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Email inválido.' },
        notEmpty: { msg: 'O campo "email" precisa ser preenchido.' },
        notNull: { msg: 'O campo "email" precisa ser preenchido' },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'O campo "password" precisa ser preenchido.' },
        notNull: { msg: 'O campo "password" precisa ser preenchido' },
        // is: {
        //   args: ["(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).+"],
        //   msg: "Password must contain one at least one uppercase, lowercase, number, and special character"
        // }
      }
    },
  });

  return User;
}