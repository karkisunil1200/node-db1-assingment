const express = require('express');
const accountRouter = require('../accounts/router');

const db = require('../data/dbConfig.js');

const server = express();

server.use('/api/accounts', accountRouter);

server.use(express.json());

module.exports = server;
