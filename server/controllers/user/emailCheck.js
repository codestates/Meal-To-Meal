const { user } = require('../../database/models');

module.exports = async (req, res) => {
  const { user_email } = req.body;
  if (!user_email) {
    res.status(400).send();
  }
  const duplicatedEmail = await user.findOne({ where: { user_email } });
  if (duplicatedEmail) {
    res.status(409).json({ message: '중복된 이메일입니다' });
  } else {
    res.status(200).json({ message: '사용가능한 이메일입니다' });
  }
};
