//결제 성공
// /payment/complete
module.exports = async (req, res) =>{
    try {
        const { imp_uid, merchant_uid } = req.body; // req의 body에서 imp_uid, merchant_uid 추출
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
          const { access_token } = getToken.data.response
          const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
            method: "get", // GET method
            headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
          });
          console.log(getPaymentData);
          // 조회한 결제정보 
          const paymentData = getPaymentData.data.response;
          const cart = await carts.findById(paymentData.merchant_uid);// // 클라에서 보내주는 가맹점 아이디를 carts 테이블에서 검색해서 받아온다.
          const amountToBePaid = cart.total_price; //db carts 테이블에 저장된 결제해야하는 금액 
          const { amount, status } = paymentData;
      if (amount === amountToBePaid) { // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액
        // await Orders.findByIdAndUpdate(merchant_uid, { $set: paymentData }); // DB에 결제 정보 저장 몽구스 문법임 mysql로 변환이 필요하다 $set 이 뭘까
        // set이라는건 대충 몽구스 문법으로 paymentData 컬럼만 바꾸는거임

      } else { // 결제금액 불일치. 위/변조 된 결제
        throw { status: "forgery", message: "위조된 결제시도" };
      }

          
      } catch (e) {
        res.status(400).send(e);
      }

}

//대충 구동순서
// 클라이언트에서 보내는 body에서 imp_uid 와 merchant_uid를 빼낸다.
// 그다음에 비동기로 토큰을 발급받는다 -> 아임포트 서버로 보내서 토큰인증을 받는것임 왜냐하면 아임포트를 이용하니까
// 