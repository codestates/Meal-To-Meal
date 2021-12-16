/* eslint-disable */
const { cart, cart_menu, menu, user, store } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');
const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const userInfo = checkTokens(req);
    if (!userInfo) {
      return res.staus(400).json({ message: '로그인이 필요합니다' });
    }
    const { imp_uid, merchant_uid, order } = req.body;
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.REACT_APP_INICIS_API_KEY, // REST API 키
        imp_secret: process.env.REACT_APP_INICIS_API_SECRET, // REST API Secret
      },
    }).catch(err => console.log(err));
    // accessToken 받기 (결제용임)
    const { access_token } = getToken.data.response; // 우리 엑세스 토큰과 겹치지는 않는가?

    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
      method: 'get', // GET method
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
    }).catch(err => console.log(err));

    // 조회한 결제정보
    const paymentData = getPaymentData.data.response;
    const matchedUser = await user.findOne({ where: { id: userInfo.id } });
    let calculatedPrice = 0;
    order.forEach((el, idx, arr) => {
      menu
        .findOne({ where: { id: el.id } })
        .then(found => {
          if (idx === arr.length - 1) {
            calculatedPrice += found.dataValues.menu_price * el.quantity;
            cart
              .create({
                merchant_uid: merchant_uid,
                total_price: calculatedPrice,
                imp_uid: paymentData.imp_uid,
                buyer_id: matchedUser.id,
              })
              .then(newCart => {
                order.forEach(el => {
                  cart_menu.create({
                    cart_id: newCart.dataValues.id,
                    menu_id: el.id,
                    order_quantity: el.quantity,
                  });
                });
                const { amount } = paymentData;
                if (amount !== calculatedPrice) {
                  return res.status(400).json({ status: 'forgery', message: '위조된 결제시도' });
                } else {
                  return res.status(200).json({ message: ' 결제 성공' });
                }
              })
              .catch(err => console.log(err));
          } else {
            calculatedPrice += found.dataValues.menu_price * el.quantity;
          }
        })
        .catch(err => console.log(err));
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
