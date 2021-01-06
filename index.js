const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.post('/api/form',(req, res) =>{
    nodemailer.createTestAccount((err, account) =>{
        const htmlEmail = `
        <h3>Detalhes de contato</h3>
            <h1>Name: ${req.body.name}</h1>
           <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({

            host: "smtp.gmail.com",
            port: 465,
            secure:true,
            auth:{
              user: "suporteesqueceusenha@gmail.com",
              pass: "suporte$1801"
            }
          })

          let mailOptions = {
            from: "suporteesqueceusenha@gmail.com",
            to: req.body.email, 
            replayTo:"danielsantospv@gmail.com",
            subject: "Reset de senha ", 
            text: req.body.message, 
            html: htmlEmail
          }
          transporter.sendMail(mailOptions, (err, info)=>{
              if(err){
                  return console.log(err)
              }
              console.log("Message sent: %s", info.message)
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
          })
          console.log(mailOptions)
    })
})

var PORT = process.env.PORT || 8080

app.listen(PORT,() =>{
    console.log(`Server ativo na porta ${PORT}`)
})