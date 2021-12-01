const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  postEmailAuth: (req, res) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    let mailOptions = {
      from: 'seojung19@gmail.com',
      to: req.body.user_email,
      // 'hgud55@naver.com'
      subject: '이 편지는 영국에서부터 시작되었습니다....',
      text: '이 편지를 받은 사람은 2주 안에 9명 이상에게 발송해야 하며...',
    };
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        console.log(data);
        res.status(200).json({ message: '이메일을 발송했습니다' });
      }
    });
  },
  getEmailAuth: data => {},
};
