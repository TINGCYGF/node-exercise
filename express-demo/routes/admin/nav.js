const express = require("express")

const router = express.Router()

router.get("/", (req, res) => {
  res.send("用户列表")
})
router.get("/add", (req, res) => {
  res.send("增加用户")
})
router.get("/edit", (req, res) => {
  res.send("修改用户")
})
router.get("/del", (req, res) => {
  res.send("删除用户")
})


module.exports = router