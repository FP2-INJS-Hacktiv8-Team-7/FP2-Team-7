const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {
  static async register(req, res) {
    try {
      const {
        email,
        full_name,
        username,
        password,
        profile_image_url,
        age,
        phone_number
      } = req.body
      console.log(req.body);
      const data = await User.create({
        email,
        full_name,
        username,
        password,
        profile_image_url,
        age,
        phone_number
      })

      const user = {
        email: data.email,
        full_name: data.full_name,
        username: data.username,
        profile_image_url: data.profile_image_url,
        age: data.age,
        phone_number: data.phone_number
      }

      res.status(201).json({user})

    } catch (error) {
      res.status(error?.code || 500).json(error)

    }
  }

  static async login(req, res) {
    try {
      const {
        email,
        password
      } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        throw {
          code: 404,
          message: "User not found"
        }
      }
      const isCorrect = comparePassword(password, user.password)
      if (!isCorrect) {
        throw {
          code: 401,
          message: "Incorrect password"
        }
      }
      const response = {
        id: user.id,
        email: user.email
      }
      const token = generateToken(response)
      res.status(200).json({
        token
      })
    } catch (error) {
      res.status(error?.code || 500).json(error)
    }
  }

  static async update(req, res) {
    try {
      const {
        email,
        full_name,
        username,
        profile_image_url,
        age,
        phone_number
      } = req.body
      const {id} = req.params
      if (id == req.user.id) {
        const user = await User.update({
          email,
          full_name,
          username,
          profile_image_url,
          age,
          phone_number
        }, {
          where: {
            id,
          },
          returning: true
        })
        res.status(200).json({user})
      } else {
        return res.status(403).json(error)
      }
    } catch (error) {
      return res.status(401).json(error)
    }
  }

  static async delete(req, res){
    try{
      const {id} = req.params
      if (req.params.id == req.user.id) {
        const result = await User.destroy({
          where: {
            id,
          },
        })
        res.status(200).json({
          message: "Your account has been sucecessfully deleted"
        })
      } else {
        return res.status(403).json(error)
      }
    } catch (error){
      return res.status(401).json(error)
    }
  }
}

module.exports = UserController