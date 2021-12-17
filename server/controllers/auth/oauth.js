require('dotenv').config();
const axios = require('axios');
axios.defaults.withCredentials = true;
const { user } = require('../../database/models');
const { generateAccessToken, generateRefreshToken } = require('../../middlewares/tokenFunctions');
const { Op } = require('sequelize');
function randomIntFromInterval2(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const usercode = randomIntFromInterval2(0, 99999);
module.exports = {
  kakaoLogin: async (req, res) => {
    try {
      const authorizationCode = req.body.authorizationCode;
      const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
      const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
      const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
      const grantType = 'authorization_code';
      console.log('authorizationCode', authorizationCode);
      if (authorizationCode) {
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
          where: {
            [Op.or]: [
              { user_email: { [Op.like]: `%${profile.nickname}%` } },
              { user_nickname: { [Op.like]: `%${profile.nickname}%` } },
            ],
          },
          defaults: {
            user_nickname: `kakao_${profile.nickname}${usercode}`,
            user_email: email || `kakao_${profile.nickname}${usercode}`,
            kakao_oauth_token: access_token,
            user_donation_count: 0,
            user_donation_money: 0,
            today_used: false,
            is_admin: false,
            is_owner: false,
            signup_method: 'kakao',
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
            .json({ accessToken: newAccessToken, signup_method: 'kakao' });
        } else {
          return res
            .cookie('refreshToken', refreshToken, {
              sameSite: 'none',
              secure: true,
              httpOnly: true,
            })
            .status(200)
            .json({ accessToken: newAccessToken, signup_method: 'kakao' });
        }
      }
    } catch (err) {
      return res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
};
