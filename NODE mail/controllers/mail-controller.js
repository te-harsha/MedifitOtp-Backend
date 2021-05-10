const nodemailer = require('nodemailer');
const fast2sms = require('fast-two-sms')



// const Patient = require('../model/patient');
const sendMail = async (req, res, next) => {
    console.log(req.body.otp);
    console.log("Hello");
    if (req.body.phoneNo != '') {
        console.log("Phone", req.body.phoneNo);
        try {
            await fast2sms.sendMessage({
                authorization: process.env.API_KEY,
                message: `${req.body.otp} is your MediFit OTP. Do not share it with anyone`,
                numbers: [req.body.phoneNo]
            })
            res.json({
                error: false,
                message: "Otp sent successfully to contact No"
            })

        } catch (err) {
            next(err.message)
        }

    } else if (req.body.EmailId != null) {
        console.log("Email", req.body.EmailId);


        try {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                service: 'gmail',
                auth: {
                    user: '@gmail.com', //email ID
                    pass: '' //Password 
                }
            });

            var mailOptions = {
                from: '@gmail.com',
                to: req.body.EmailId,
                subject: `Your Otp `,
                html: `Your Otp is ${req.body.otp}`,


            };

            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info, "mail sent")
                }
            });
            res.json({
                error: false,
                message: "Mail sent successfully"
            })
        } catch (err) {
            next(err.message)
        }
    }
    res.send('ok')
}

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'harshichin7747@gmail.com', //email ID
//         pass: 'gayathrivijay' //Password 
//     }
// });

// function sendMail() {
//     var details = {
//         from: 'harshichin7747@gmail.com', // sender address same as above
//         to: email, // Receiver's email id
//         subject: 'Your demo OTP is ', // Subject of the mail.
//         html: "Yout OTP is " + otp // Sending OTP 
//     };


//     transporter.sendMail(details, function (error, data) {
//         if (error)
//             console.log(error)
//         else
//             console.log(data);
//     });
// }

module.exports = {
    sendMail
}