const config = require('config')
const nodemailer = require('nodemailer');
const mailTemplate = require('../template/mailTemplate')

module.exports = function (email, userName, code, userId) {
  let url = `${config.get('url')}/${userId}/${code}`
  const transporter = nodemailer.createTransport({
    host: config.get('mailHost'),
    tls: { rejectUnauthorized: false },
    auth: {
      user: config.get('mailAddress'),
      pass: config.get('mailPassword')
    }
  });

  let mailOption = {
    from: config.get('mailAddress'),
    to: email,
    subject: 'Verify your email address',
    html: mailTemplate(userName, code, url)
  }
  let isSuccessful = false;
  let information;
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      isSuccessful = false;
      console.log('[MAIL] Failed.')
    }
    else {
      isSuccessful = true;
      information = info;
      console.log('[MAIL] Success');
    }
  });
  return { isSuccessful, information };
}