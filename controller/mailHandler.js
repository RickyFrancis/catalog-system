const config = require('config')
const nodemailer = require('nodemailer');
const mailTemplate = require('../template/mailTemplate')

module.exports = function (email, userName, code, url) {
  const transporter = nodemailer.createTransport({
    service: config.get('mailService'),
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
    }
    else {
      isSuccessful = true;
      information = info;
      console.log('Success');
    }
  });
  return { isSuccessful, information };
}