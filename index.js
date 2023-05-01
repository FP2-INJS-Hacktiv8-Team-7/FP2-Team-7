require("dotenv").config()

const express = require("express")
const app = express()
const router = require("./routers")
const PORT = process.env.PORT

app.use(router)

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`)
})
