const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply@ndub.edu.bd',
    pass: 'anotherString'
  }
});

let mailOption = {
  from: 'noreply@ndub.edu.bd',
  to: 'ansarulsohan@gmail.com',
  subject: 'Query regarding the ndub automated mailing system',
  text: 'Dear sohan, this is to test the mailing service'
}


transporter.sendMail(mailOption, (err, info) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log(info);
  }
})