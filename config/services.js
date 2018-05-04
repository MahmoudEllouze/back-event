var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILUSER, // generated ethereal user
            pass: process.env.MAILPASSWORD // generated ethereal password
        }
    });

var mailOptions = {
  from: 'mahmoud.ellouze911@gmail.com',
  to: 'mahmoud.ellouze911@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

var sendMail = function(){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
}

module.exports = {sendMail : sendMail}