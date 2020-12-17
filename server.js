const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const server  = express();

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};
server.use(cors(corsOptions));

const routes = require('./api/routes');
routes(server);

// Priority serve any static files.
server.use(express.static(path.resolve(__dirname, './client/build')));

// All requests return the React app, so it can handle routing.
server.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
