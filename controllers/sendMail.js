require("dotenv").config();
const nodemailer = require("nodemailer");


const sendMail = async (receiverName, to, subject, html ) => {

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.email, // generated ethereal user
              pass: process.env.emailPassword, // generated ethereal password
            },
          });

          console.log("transporter : " , transporter)

          let info = await transporter.sendMail({
            from: `Kharidiye <${process.env.email}>`,
            to,
            subject,
            html
          });

          console.log("info : ", info)

          transporter.sendMail(info, function (error, info)  {
            if (!error) console.log("email sent successfully ")
            else console.log("Inside transporter.sendmail, email not sent : " , info.response)
        })
    } catch (error) {
        console.log("email not sent : ", error)
    }
     
}

module.exports = sendMail