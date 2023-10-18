require('dotenv').config();
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const app = express();
const server = require('http').createServer(app);
const {Server} = require("socket.io");
let PORT = process.env.PORT || 4000;

const cors = require('cors');

const user = require('./models/userModel');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var routes = require('./routes/userRoute');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const io = new Server(server, {
    cors : {
        origin : "https://chatappbykshitij.netlify.app/",
        methods : ["GET","POST"],
    },
})


io.on('connection', (socket) => {
    console.log("user connected");
    socket.emit('chat-message', "Hello kshitij");

    socket.on("send_message", (data => {
        console.log(data);
        socket.broadcast.emit("received_message", data);
    }))
})

app.get("/", (req,res) => {
    res.send("hello!");
});


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("db connected successfully");
    server.listen(PORT, () => console.log(`${PORT} is listening!`));

}, (err) => {
    //err handle;
});

app.use(function(req, res, next) {
//   console.log(req.headers);
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    // console.log("yes");
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// app.use("/",routes);
routes(app);

// server.listen(PORT, () => console.log(`${PORT} is listening!`));

module.exports = app;