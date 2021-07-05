
const express = require("express")
const app = express()
require("dotenv").config()

const bodyParser = require("body-parser")
const cors = require("cors")
const nodemailer = require("nodemailer")
const twilio = require('twilio');



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

const port = process.env.PORT
const password = process.env.PASSWORD
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myPhone_no = process.env.MY_PHONE_NO;
const myEmail = process.env.MY_EMAIL;

app.post('/send_email',async function(req,res){

    const response =  req.body.data;
   console.log("backend", response)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: myEmail,
          pass: password
        }
      });
      
      var mailOptions = {
        from: myEmail,
        to: response.receiverEmail,
        subject: 'website monitoring',
        html:`<h2>status_code: ${response.status}</h2> </br> <h2> url : ${response.website}<h2>` 
      };
      
     await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.status(201).send("success");
})

app.post('/send_sms', function(req,res){

    const response =  req.body
    console.log(response)
    const client = require('twilio')(accountSid, authToken);
    
    client.messages.create({
        to:`+91${response.phone_no}`,
        from:`+91${myPhone_no}`,
        body:`status_code :${response.status}  url:${response.website}`
    })
    
    res.status(201).send("successfully sent message");
})

app.listen(port,function(err,res){
    if(err) console.log(err)

    console.log("server started at port 4000")
})