const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3333;
const server = express();
server.use(bodyParser.json());
server.use(cors());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

// dummy data
const stats = [
  {
    username: 'Paul',
    email: 'username@example.com',
    rank: 1,
    time: '02 : 45'
  },
  {
    username: 'Ben',
    email: 'ben@example.com',
    rank: 2,
    time: '06 : 35'
  },
  {
    username: 'Alex',
    email: 'alex@example.com',
    rank: 3,
    time: '08 : 35'
  },
  {
    username: 'Sean',
    email: 'sean@example.com',
    rank: 4,
    time: '09 : 15'
  },
  {
    username: 'John',
    email: 'john@example.com',
    rank: 5,
    time: '11 : 11'
  },
  {
    username: 'Brian',
    email: 'brian@example.com',
    rank: 6,
    time: '11 : 41'
  },
  {
    username: 'Dan',
    email: 'dan@example.com',
    rank: 7,
    time: '11 : 48'
  },
  {
    username: 'Kate',
    email: 'kate@example.com',
    rank: 8,
    time: '11 : 58'
  },
  {
    username: 'Maria',
    email: 'maria@example.com',
    rank: 9,
    time: '12 : 48'
  },
  {
    username: 'Julio',
    email: 'julio@example.com',
    rank: 10,
    time: '12 : 49'
  },
  {
    username: 'Lucy',
    email: 'lucy@example.com',
    rank: 11,
    time: '13 : 19'
  }
];

server.get('/stats', (req, res) => {
  res.status(200).json(stats);
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});
