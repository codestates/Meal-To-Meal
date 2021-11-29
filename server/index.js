require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

sequelize.sync();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  })
);

app.get('/', (req, res) => {
  res.send('우리는 서버배포에 성공한 노서정 진성준이다');
});

app.use(cookieParser());

let server;
console.log(`server running at ${HTTPS_PORT}`);
server = app.listen(HTTPS_PORT);

module.exports = server;
