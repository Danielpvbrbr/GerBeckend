const http = require('http'); 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(require("cors")());
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.header("Acces-Control-Allow-Origin", "*")
    res.json({message: "Tudo ok por aqui!"});
})

app.post('/api/form',(req, res, next) =>{
    const name = req.body.name;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    require("./nodemail")(email, name, mensagem)
    .then(response => res.json(response))
    .catch(error => res.json(error));
        
})


const server = http.createServer(app); 
server.listen(process.env.PORT || 3030);
console.log("Servidor escutando na porta 3030...")