const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const Port = process.env.Port
const app = express();
let corsOptions = {
  origin:"https://nodemailer-frontend.vercel.app",
  methods:['GET','POST'],
  allowedHeaders:['Content-Type','Authorization'],
  credentials: true
 };

app.use(cors(corsOptions));

// app.get('/cors', (req, res) =>{
//   res.set('Access-Control-Allow-Origin','*')
// })
app.use(express.json());
app.use("/", router);

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });


app.listen(Port, 
() => console.log(`Server is runining on port ${Port}`));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
    auth: {
    user: process.env.SELL,
    pass: process.env.PASS_KEY,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact",cors(corsOptions) ,(req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: name,
    to: process.env.SELL,
    subject: "Contact Form Submission",
    html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
        `,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
  const mailc = {
    from:'Ab-developers',
    to: email,
    subject: 'Thank You for Contacting Us',
        html: `
            <h1>Ab-developers</h1>
            <p>You send us this message: ${message}</p>
            <p>Thank you for contacting us. We will get back to you shortly.</p>
        `
  };
  contactEmail.sendMail(mailc, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
