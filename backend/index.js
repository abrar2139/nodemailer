const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors")

const dotenv = require("dotenv");
dotenv.config();
const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/", router);
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

router.post("/contact", (req, res) => {
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
