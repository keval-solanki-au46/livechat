const express = require("express");
//const mongoose = require("mongoose");
const session = require("express-session");

const app = express();

const LoginRouter = require("./routers/loginRouter");
const RegisterRouter = require("./routers/RegisterRouter");
const chatRouter = require("./routers/chatRouter");
const Logout = require("./routers/logoutRouter");


const http=require('http').createServer(app)
const io=require('socket.io')(http)
const PORT=process.env.PORT||5000
const connectDB = require("./db/db");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "livechat", resave: false, saveUninitialized: true }));

app.use(LoginRouter);
app.use(RegisterRouter);
app.use(chatRouter);
app.use(Logout);

app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/views")
})

io.on('connection',(socket)=>{
  console.log('connected')

  socket.on('message',(msg)=>{
      console.log(msg)

      socket.broadcast.emit('message',msg)
  })
})


//app.use(function (req, res) {
  //res.status(404).end("404 NOT FOUND");
//});

http.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`)
  connectDB()
})