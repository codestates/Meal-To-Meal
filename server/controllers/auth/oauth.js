require('dotenv').config();
const axios = require('axios');
axios.defaults.withCredentials = true;
const { user } = require('../../database/models');
const checkTokens = require('../../middlewares/tokenAuth');
const { generateAccessToken, generateRefreshToken } = require('../../middlewares/tokenFunctions');

module.exports = {
  kakaoLogin: async (req, res) => {
    try {
      const userInfo = checkTokens(req);
      if (userInfo) {
        return res.status(400).json({ message: '이미 로그인되었습니다' });
      } else {
        const authorizationCode = req.body.authorizationCode;
        const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
        const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
        const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
        const grantType = 'authorization_code';

        const response = await axios({
          method: 'POST',
          url: `https://kauth.kakao.com/oauth/token?code=${authorizationCode}&client_id=${KAKAO_CLIENT_ID}&client_secret=${KAKAO_CLIENT_SECRET}&redirect_uri=${KAKAO_REDIRECT_URI}&grant_type=${grantType}`,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          },
        });

        const { access_token } = response.data;

        const kakaoUserInfo = await axios({
          method: 'GET',
          url: 'https://kapi.kakao.com/v2/user/me',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-type': 'application/x-www-form-urlencoded',
          },
        });

        const { email, profile } = kakaoUserInfo.data.kakao_account;

        const [newUserInfo, created] = await user.findOrCreate({
          where: { user_nickname: profile.nickname },
          defaults: {
            user_nickname: profile.nickname,
            user_email: email || profile.nickname,
            kakao_oauth_token: access_token,
            //* db에서 삭제해도 되는지 검토 필요
            user_donation_count: 0,
            user_donation_money: 0,
            today_used: false,
            is_admin: false,
            // profile_url: profile.profile_image_url,
            signup_method: 'kakao',
            email_verified: false,
            //* db에 스키마 업데이트
          },
        });

        delete newUserInfo.dataValues.password;

        const newAccessToken = generateAccessToken(newUserInfo.dataValues);
        const refreshToken = generateRefreshToken(newUserInfo.dataValues);

        if (created) {
          return res
            .cookie('refreshToken', refreshToken, {
              sameSite: 'none',
              secure: true,
              httpOnly: true,
            })
            .status(201)
            .json({ accessToken: newAccessToken });
        } else {
          return res
            .cookie('refreshToken', refreshToken, {
              sameSite: 'none',
              secure: true,
              httpOnly: true,
            })
            .status(200)
            .json({ accessToken: newAccessToken });
        }
      }
    } catch (err) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
};
