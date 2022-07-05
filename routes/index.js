const express = require('express');

const noteTakerRoute = require('./noteTaker');

const app = express();

app.use('/noteTaker', noteTakerRoute);

module.exports = app;