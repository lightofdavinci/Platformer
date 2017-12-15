const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const server  = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/game', { useMongoClient: true });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(
  session({
    secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
    resave: true,
    saveUninitialized: true,
  })
);

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};
server.use(cors(corsOptions));

const routes = require('./api/routes/routes');
routes(server);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});

// // dummy data
// const stats = [
//   {
//     username: 'Paul',
//     email: 'username@example.com',
//     rank: 1,
//     time: '02 : 45'
//   },
//   {
//     username: 'Ben',
//     email: 'ben@example.com',
//     rank: 2,
//     time: '06 : 35'
//   },
//   {
//     username: 'Alex',
//     email: 'alex@example.com',
//     rank: 3,
//     time: '08 : 35'
//   },
//   {
//     username: 'Sean',
//     email: 'sean@example.com',
//     rank: 4,
//     time: '09 : 15'
//   },
//   {
//     username: 'John',
//     email: 'john@example.com',
//     rank: 5,
//     time: '11 : 11'
//   },
//   {
//     username: 'Brian',
//     email: 'brian@example.com',
//     rank: 6,
//     time: '11 : 41'
//   },
//   {
//     username: 'Dan',
//     email: 'dan@example.com',
//     rank: 7,
//     time: '11 : 48'
//   },
//   {
//     username: 'Kate',
//     email: 'kate@example.com',
//     rank: 8,
//     time: '11 : 58'
//   },
//   {
//     username: 'Maria',
//     email: 'maria@example.com',
//     rank: 9,
//     time: '12 : 48'
//   },
//   {
//     username: 'Julio',
//     email: 'julio@example.com',
//     rank: 10,
//     time: '12 : 49'
//   },
//   {
//     username: 'Lucy',
//     email: 'lucy@example.com',
//     rank: 11,
//     time: '13 : 19'
//   }
// ];

// server.get('/stats', (req, res) => {
//   res.status(200).json(stats);
// });
