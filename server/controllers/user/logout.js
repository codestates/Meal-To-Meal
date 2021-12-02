const checkTokens = require('../../middlewares/tokenAuth');

module.exports = (req, res) => {
  const userInfo = checkTokens(req);
  if (!userInfo) {
    res.status(401).json({ message: '로그인이 필요합니다' });
  } else {
    return res
      .clearCookie('refreshToken', {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        // domain: *,
      })
      .status(200)
      .json({ message: '로그아웃 되었습니다' });
  }
};
