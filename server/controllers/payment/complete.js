module.exports = async (req, res) =>{
    try {
        const { imp_uid, merchant_uid } = req.body; 
        // req의 body에서 imp_uid, merchant_uid 추출 
        //imp_uid => 우리가 지정해둔 영수증 번호 ex) sudo_hired_1 ~~~
        // merchant_uid_
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

          const cartInfo = await carts.findOne({where:{merchant_uid}});
          // 카트에서 결제하기 버튼을 눌렀을때 db에 저장되는 자료를 찾아서 오는것

          const amountToBePaid = Number(cartInfo.amount);
          // find cart로 찾은 컬럼에서 amount 즉 결제해야하는 금액만 가져온다.
          const { amount, status } = paymentData;
        if (amount !== amountToBePaid) { 
        // paymentData.amount는 iamport 서버에 요청해서 받은 실제 결제되는 가격에
        // amountToBePaid 는 우리 db에 저장된 결제해야하는 가격
        // 일치하지않으면 위조된 결제시도라고 보내준다.
        return res.status(200).json({status: 'forgery',message: '위조된 결제시도'});
        // await cart.findByIdAndUpdate(merchant_uid, { $set: paymentData }); // DB에 결제 정보 저장 
        //몽구스 문법임 mysql로 변환이 필요하다 $set  이 뭘까
        // 대충 저 merchant_uid에 해당하는 자료를 cart 테이블에서 찾아서  payments를 바꿔준느듯

        } 
        //일치했을땐  payments 로 오는 데이터들을 cart에 넣어서 업데이트 해준다.
        // 왜? cart가 사실상 구매내역 

      } catch (e) {
        res.status(400).send(e);
      }

}
