const router = require("express").Router()
const userRouter = require("./userRouter")
const photoRouter = require("./photoRouter")
const socialMediaRouter = require("./socialMediaRouter")
const commentRouter = require("./commentRouter")

router.use("/users", userRouter)
router.use("/photos", photoRouter)
router.use("/comments", commentRouter)
router.use("/socialmedias", socialMediaRouter)

module.exports = router
