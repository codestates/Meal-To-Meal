require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { sequelize } = require('./database/models');

const authRouter = require('./router/authRouter');
const cartRouter = require('./router/cartRouter');
const menuRouter = require('./router/menuRouter');
const paymentRouter = require('./router/paymentRouter');
const rankingRouter = require('./router/rankingRouter');
const reviewRouter = require('./router/reviewRouter');
const storeRouter = require('./router/storeRouter');
const usermealRouter = require('./router/usermealRouter');
const userRouter = require('./router/userRouter');
const searchRouter = require('./router/searchRouter');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cookieParser());

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

sequelize
  .sync({ force: false })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connected!');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error(':file_cabinet:  Database Error! ' + err);
  });

sequelize
  .query(
    "CREATE EVENT IF NOT EXISTS reset_today_used ON SCHEDULE EVERY 1 DAY STARTS '2021-12-09 00:00:00' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'reset_today_used_to_false_on_every_12' DO UPDATE user SET today_used=0;"
  )
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Event Scheduled!');
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.log('err', err);
  });

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'authorization'],
  })
);

app.get('/', (req, res, next) => {
  res.send('나는 서버다');
});

app.use('/auth', authRouter);
app.use('/oauth', authRouter);
app.use('/cart', cartRouter);
app.use('/menu', menuRouter);
app.use('/menu-list', menuRouter);
app.use('/payment', paymentRouter);
app.use('/ranking', rankingRouter);
app.use('/review', reviewRouter);
app.use('/review-list', reviewRouter);
app.use('/store', storeRouter);
app.use('/store-list', storeRouter);
app.use('/user', userRouter);
app.use('/user-meal', usermealRouter);
app.use('/search', searchRouter);

let server = app.listen(HTTPS_PORT);
// eslint-disable-next-line no-console
console.log(`server running at ${HTTPS_PORT}`);

module.exports = server;
