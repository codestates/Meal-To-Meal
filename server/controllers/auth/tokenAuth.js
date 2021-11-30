const { isAuthorized, checkRefreshToken } = require('../../middlewares/tokenFunctions');

module.exports = (req, res) => {
  const accessTokenData = isAuthorized(req);
  const refreshToken = req.cookies.refreshToken;
  if (!accessTokenData) {
    const userInfo = checkRefreshToken(refreshToken);
    if (!userInfo) {
      res.status(400).json({ message: '잘못된 요청입니다' });
    } else {
      res.status(200).json({ userInfo: userInfo });
    }
  } else {
    res.status(200).json({ userInfo: accessTokenData });
  }
};
