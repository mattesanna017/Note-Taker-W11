const express = require('express');

const noteTakerRoute = require('./notes');

const app = express();

app.use('/notes', noteTakerRoute);

module.exports = app;