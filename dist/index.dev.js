"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.post('/api/form', function (req, res) {
  nodemailer.createTestAccount(function (err, account) {
    var htmlEmail = "\n        <h3>Detalhes de contato</h3>\n            <h1>Name: ".concat(req.body.name, "</h1>\n           <p>").concat(req.body.message, "</p>\n        ");
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "suporteesqueceusenha@gmail.com",
        pass: "suporte$1801"
      }
    });
    var mailOptions = {
      from: "suporteesqueceusenha@gmail.com",
      to: req.body.email,
      replayTo: "danielsantospv@gmail.com",
      subject: "Reset de senha ",
      text: req.body.message,
      html: htmlEmail
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        return console.log(err);
      }

      console.log("Message sent: %s", info.message);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    console.log(mailOptions);
  });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("Server ativo na porta ".concat(PORT));
});