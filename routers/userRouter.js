const router = require("express").Router()
const UserController = require("../controllers/userController")
const authentication = require("../middlewares/authentication")

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.put("/:id", authentication, UserController.update)
router.delete("/:id", authentication, UserController.delete)


module.exports = router
