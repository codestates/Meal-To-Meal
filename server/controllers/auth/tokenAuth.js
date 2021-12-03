const checkTokens = require('../../middlewares/tokenAuth');

module.exports = (req, res) => {
  const userInfo = checkTokens(req);
  if (!userInfo) {
    res.status(400).json({ message: '잘못된 요청입니다' });
  } else {
    res.status(200).json({ userInfo: userInfo });
  }
};
