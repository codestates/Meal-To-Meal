require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { sequelize } = require('./models');

const authRouter = require('./router/authRouter');
const cartRouter = require('./router/cartRouter');
const menuRouter = require('./router/menuRouter');
const paymentRouter = require('./router/paymentRouter');
const rankingRouter = require('./router/rankingRouter');
const reviewRouter = require('./router/reviewRouter');
const storeRouter = require('./router/storeRouter');
const usermealRouter = require('./router/usermealRouter');
const userRouter = require('./router/userRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cookieParser());

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

sequelize.sync();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  })
);

app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/menu', menuRouter);
app.use('/payment', paymentRouter);
app.use('/ranking', rankingRouter);
app.use('/review', reviewRouter);
app.use('/store', storeRouter);
app.use('/usermeal', usermealRouter);
app.use('/user', userRouter);

let server = app.listen(HTTPS_PORT);
// eslint-disable-next-line no-console
console.log(`server running at ${HTTPS_PORT}`);

module.exports = server;
