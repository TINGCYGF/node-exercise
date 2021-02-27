const express = require("express")
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const app = express()

//引入外部模块
const admin = require("./routes/admin")
const api = require("./routes/api")
const index = require("./routes/index")

//配置模板引擎后缀为：html
app.engine("html", ejs.__express);
app.set("view engine", "ejs");

app.use(express.static("static"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser());
//配置中间件
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))

//挂载外部模块
app.use("/admin", admin)
app.use("/app", api)
app.use("/", index)

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
  next()
})

app.post(".doLogin", (req, res) => {
  let body = req.body;
  console.log(body)
  res.send(body)
})



app.listen(3000)