const express = require("express")
const router = express.Router()

//引入模块
const user = require("./admin/user")
const nav = require("./admin/nav")

router.get("/", (req, res) => {
  res.send("后台管理中心")
})
//挂载模块
router.user("/user", user)
router.nav("/user", nav)

module.exports = router