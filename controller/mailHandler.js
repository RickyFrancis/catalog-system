const config = require('config')
const nodemailer = require('nodemailer');
const mailTemplate = require('../template/mailTemplate');
const resetTemplate = require('../template/resetTemplate');

module.exports = function (email, userName, code, userId, action) {
  let url = `${config.get('url')}/verify/${userId}/${code}`
  const transporter = nodemailer.createTransport({
    host: config.get('mailHost'),
    tls: { rejectUnauthorized: false },
    auth: {
      user: config.get('mailAddress'),
      pass: config.get('mailPassword')
    }
  });
  let mailHtml;
  if (action == 'reset') mailHtml = resetTemplate;
  else if (action == 'verify') mailHtml = mailTemplate;
  let mailOption = {
    from: config.get('mailAddress'),
    to: email,
    subject: 'Verify your email address',
    html: mailHtml(userName, code, url)
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