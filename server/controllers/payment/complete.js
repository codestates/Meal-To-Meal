/* eslint-disable */
const { cart } = require('../../database/models');
const { cart_menu } = require('../../database/models');
const { menu } = require('../../database/models');
const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');
const axios = require('axios');
module.exports = async (req, res) => {
  try {
    const { imp_uid, merchant_uid, order } = req.body; // 클라이언트에서 구매버튼을 눌렀을때 유저 아이디와 스토어 아이디를 보내줘야함.
    // req의 body에서 imp_uid, merchant_uid 추출
    //imp_uid => 아임포트에서 자체적으로 이용하는 영수증번호 ex) imp_skjdfjsldkf~~~
    // merchant_uid => 우리가 자체적으로 만드는 영수증번호  ex) sudo_hired ~~~
    const getToken = await axios({
      url: 'https://api.iamport.kr/users/getToken', // 이 주소로 보내야함.
      method: 'post', // POST method
      headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
      data: {
        imp_key: process.env.REACT_APP_INICIS_API_KEY, // REST API 키
        imp_secret: process.env.REACT_APP_INICIS_API_SECRET, // REST API Secret
      },
    }).catch(err => console.log('tokenerr---------', err));
    // accessToken 받기 (결제용임)
    const { access_token } = getToken.data.response; // 우리 엑세스 토큰과 겹치지는 않는가?

    const getPaymentData = await axios({
      url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
      method: 'get', // GET method
      headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
    }).catch(err => console.log('payerr------------', err));

    // 조회한 결제정보
    const paymentData = getPaymentData.data.response;
    const userInfo = checkTokens(req);
    const matchedUser = await user.findOne({ where: { id: userInfo.id } });
    let calculatedPrice = 0;
    order.forEach((el, idx, arr) => {
      console.log('el--------------', el);
      console.log('idx--------------', idx);
      console.log('arr--------------', arr);

      menu
        .findOne({ where: { id: el.id } })
        .then(found => {
          // console.log('price', el.dataValues.menu_price, 'order_quantity', cur.order_quantity);
          if (idx === arr.length - 1) {
            console.log('found----------------', found.dataValues);
            calculatedPrice += found.dataValues.menu_price * el.quantity;
            cart
              .create({
                merchant_uid: merchant_uid,
                total_price: calculatedPrice,
                imp_uid: paymentData.imp_uid,
                buyer_id: matchedUser.id,
              })
              .then(newCart => {
                console.log('newCart--------------------', newCart);
                order.forEach(el => {
                  cart_menu.create({
                    cart_id: newCart.dataValues.id,
                    menu_id: el.id,
                    order_quantity: el.quantity,
                  });
                });
                const { amount } = paymentData;
                console.log('amount------------', amount);
                console.log('calcul------------', calculatedPrice);

                if (amount !== calculatedPrice) {
                  console.log('hi------------------------------');
                  // paymentData.amount는 iamport 서버에 요청해서 받은 실제 결제되는 가격에
                  // amountToBePaid 는 우리 db에 저장된 결제해야하는 가격
                  // 일치하지않으면 위조된 결제시도라고 보내준다.
                  return res.status(400).json({ status: 'forgery', message: '위조된 결제시도' });
                } else {
                  return res.status(200).json({ message: ' 결제 성공' });
                }
              })
              .catch(err => console.log('newcarterr----------------', err));
          } else {
            calculatedPrice += found.dataValues.menu_price * el.quantity;
          }
        })
        .catch(err => console.log('findmenuerr--------------', err));
    });

    // find cart로 찾은 컬럼에서 amount 즉 결제해야하는 금액만 가져온다.
  } catch (err) {
    console.log('final------------', err);
    res.status(500).send(err);
  }
};
