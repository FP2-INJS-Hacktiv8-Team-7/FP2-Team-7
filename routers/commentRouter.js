const express = require("express")
const app = express()
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController")

app.use(authentication)
app.get("/", getAllComments)
app.use(authorization)
app.post("/", createComment)
app.use("/:id", authorization)
app.put("/:id", updateComment)
app.delete("/:id", deleteComment)

module.exports = app
