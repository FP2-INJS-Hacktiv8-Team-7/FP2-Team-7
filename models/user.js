"use strict"
const { hashPassword } = require("../helpers/bcrypt")
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo)
      this.hasMany(models.SocialMedia)
      this.hasMany(models.Comment)
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Fullname is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "This username has been used, try another one",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Username is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password is required",
          },
        },
      },
      profile_image_url: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true,
          notEmpty: {
            args: true,
            msg: "Profile image url is required",
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          notEmpty: {
            args: true,
            msg: "Age is required",
          },
        },
      },
      phone_number: {
        type: DataTypes.BIGINT,
        validate: {
          isNumeric: true,
          notEmpty: {
            args: true,
            msg: "Phone number is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      // Auto convert password from plain to hash if data has pass the validations from userController
      hooks: {
        beforeCreate: async (user, opt) => {
          const hashedPassword = hashPassword(user.password)
          user.password = hashedPassword
        },
      },
    }
  )
  return User
}
