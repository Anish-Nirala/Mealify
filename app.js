const express = require('express');
const path = require('path');
const router = require('./routes/router')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname) + '/templates');

app.use(express.static('static'));

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT);