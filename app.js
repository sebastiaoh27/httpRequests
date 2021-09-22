const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser')
const urlencoded = require("body-parser/lib/types/urlencoded");
const fs = require('fs');
const exampleRest =require("./router")

app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));

server.listen(3000);
app.use(express.static(__dirname + '/public'))

app.post('/api/post',exampleRest)
app.get('/api/get/:bsn',exampleRest)
app.get('/api/get',exampleRest)
app.patch('/api/patch/:bsn',exampleRest)
app.delete('/api/delete/:bsn',exampleRest)



