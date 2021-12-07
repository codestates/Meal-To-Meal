// const {cart} = require('../../database/models/cart')
module.exports = async (req, res) =>{
    try {
        const { imp_uid, merchant_uid } = req.body;  // 클라이언트에서 구매버튼을 눌렀을때 유저 아이디와 스토어 아이디를 보내줘야함.
        // req의 body에서 imp_uid, merchant_uid 추출 
        //imp_uid => 아임포트에서 자체적으로 이용하는 영수증번호 ex) imp_skjdfjsldkf~~~
        // merchant_uid => 우리가 자체적으로 만드는 영수증번호  ex) sudo_hired ~~~
        const getToken = await axios({
            url: "https://api.iamport.kr/users/getToken", // 이 주소로 보내야함.
            method: "post", // POST method
            headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
            data: {
              imp_key: process.env.REACT_APP_INICIS_API_KEY, // REST API 키
              imp_secret: process.env.REACT_APP_INICIS_API_SECRET // REST API Secret
            }
          });
          // accessToken 받기 (결제용임)
          const { access_token } = getToken.data.response // 우리 엑세스 토큰과 겹치지는 않는가? 

          const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
            method: "get", // GET method
            headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
          });

          // 조회한 결제정보 
          const paymentData = getPaymentData.data.response;

          const cartInfo = await cart.findOne({where:{merchant_uid}});
          // 카트에서 결제하기 버튼을 눌렀을때 db에 저장되는 자료를 찾아서 오는것

          // 클라이언트에서 메뉴아이디를 보내주면 -> 스토어 아이디까지 찾을수있음 이거를 이용해서 찾으면될듯

          const amountToBePaid = Number(cartInfo.total_price);
          // find cart로 찾은 컬럼에서 amount 즉 결제해야하는 금액만 가져온다.
          const { amount, status } = paymentData;
        if (amount !== amountToBePaid) { 
        // paymentData.amount는 iamport 서버에 요청해서 받은 실제 결제되는 가격에
        // amountToBePaid 는 우리 db에 저장된 결제해야하는 가격
        // 일치하지않으면 위조된 결제시도라고 보내준다.
        return res.status(400).json({status: 'forgery',message: '위조된 결제시도'});
        } 
        //일치했을땐  payments 로 오는 데이터들을 cart에 넣어서 업데이트 해준다.
        await cart.update({
          imp_uid : paymentData.imp_uid,
        })

        return res.status(200).json({message:" 결제 성공"})
      } catch (e) {
        res.status(400).send(e);
      }

}
