const express = require("express")
const ejs = require("ejs");
const app = express()

//配置模板引擎后缀为：html
app.engine("html", ejs.__express);
app.set("view engine", "ejs");

app.use(express.static("static"))

//应用级中间件
app.use((req, res, next) => {
  console.log("添加中间件")
  //需要匹配下面中间件就要添加next回调
  next()
})

app.get("/", (req, res) => {
  //对象假数据
  let userinfo = {
    username: "Ting",
    age: "20"
  }
  // 标签假数据
  let article = "<h3>我是标价数据</h3>"
  res.render("index.ejs", {
    //传入数据
    userinfo: userinfo,
    article: article
  })
})

app.use((req, res, next) => {
  res.status(404).send("404")
})

app.listen(3000)