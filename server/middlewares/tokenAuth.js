const { checkAccessToken, checkRefreshToken } = require('./tokenFunctions');

module.exports = (req, res, next) => {
  const accessToken = checkAccessToken(req);
  const refreshToken = checkRefreshToken(req.cookies.refreshToken);
  if (!accessToken && !refreshToken) {
    return null;
  }
  next();
};
