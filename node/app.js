import express from 'express';

import constants from './config/constants';
// import db from './config/database';
import middlewaresConfig from './config/middlewares';
import socketMiddleware from './middlewares/socket.middleware';
import http from 'http';
import path from 'path';


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

middlewaresConfig(app);


// FOR HTTPS
let server = http.createServer(app)
  .listen(constants.PORT, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(`Server running on : ${constants.PORT}`);
    }
  });


const io = require('socket.io').listen(3001);
socketMiddleware(io);


app.get('/', (req, res) => {

  // res.sendFile("/dist/index.html", {"root": __dirname});
  res.json({msg: "Hello World"})
})

