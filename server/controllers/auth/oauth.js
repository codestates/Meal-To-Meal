require('dotenv').config();
const axios = require('axios');
const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');
const { generateAccessToken, sendAccessToken } = require('../../middlewares/tokenFunctions');

module.exports = {
  kakaoLogin: async (req, res) => {
    try {
      const userInfo = checkTokens(req);
      if (userInfo) {
        return res.status(400).json({ message: '이미 로그인되었습니다' });
      } else {
        const authorizationCode = req.body;
        const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
        const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
        const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
        const grantType = 'authorization_code';

        const response = await axios({
          method: 'POST',
          url: `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&grant_type=${grantType}`,
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        });

        const { access_token } = response.data;

        const kakaoUserInfo = await axios({
          method: 'GET',
          url: 'https://kapi.kakao.com/v2/user/me',
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const { email, profile } = kakaoUserInfo.data.kakao_account;
        //console.log(kakaoUserInfo.data.kakao_account);

        const [newUserInfo, created] = await user.findOrCreate({
          where: { email },
          defaults: {
            user_nickname: profile.nickname,
            user_email: email,
            profile_url: profile.profile_image_url,
            signup_method: '카카오',
            email_verified: true,
            //* db에 스키마 업데이트 여부 체크
            created_at: new Date(),
            updated_at: new Date(),
          },
        });

        delete newUserInfo.dataValues.password;

        const newAccessToken = generateAccessToken(newUserInfo.dataValues);
        sendAccessToken(res, newAccessToken);

        if (created) {
          return res.status(201).json({ userInfo: newUserInfo });
        } else {
          return res.status(200).json({ newUserInfo, data: kakaoUserInfo.data });
        }
      }
    } catch (err) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
  kakaoSignout: async (req, res) => {
    //     카카오 로그아웃
    // 카카오 로그아웃을 하면 서비스가 발급받은 토큰이 만료되게 되어
    // 해당 서비스에서는 더 이상 해당 토큰으로 카카오 API를 호출할 수 없게 된다.
    // 카카오 로그아웃이 되었더라도 서비스 로그아웃이 자동으로 되는게 아니므로 서비스 로그아웃은 자체로 구현해야 한다.
    // 카카오 API는 따로 카카오계정과 함께 로그아웃 기능을 제공하고 있기 때문에 서비스 로그아웃과 함께 카카오 계정을 로그아웃 할 수도 있다.
  },
};
