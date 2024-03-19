const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors")

const app = express();
app.use(cors())

app.use(express.json());
app.use("/", router);
app.listen(5000, 
() => console.log("Server is runining on port 5000"));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
    auth: {
    user: "mabrarqadri3@gmail.com",
    pass: "eers zyrg ttew uaoj",
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
    to: "mabrarqadri3@gmail.com",
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
        `,
        attachments: [
            {
                filename: 'Coding', // Change the filename as needed
                path: './images/code.avif', // Provide the path to your image file
                
            }
        ]
  };
  contactEmail.sendMail(mailc, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
