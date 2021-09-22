const express = require('express')
const router =express.Router()
const fs = require('fs')
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const path = "./public/exampleDb.json"

//Create
router.post('/api/post',urlencodedParser,(req,res) => {
    fs.readFile(path,'utf8',(err,data) => {
        var db =JSON.parse(data)
        db[req.body.bsn] ={
            "name":req.body.name,
            "age": req.body.age,
            "nationality": req.body.nationality,
            "dutchSpeaker": req.body.dutchSpeaker,
            "bsn": req.body.bsn
        }
        fs.writeFile(path,JSON.stringify(db),'utf8',(err)=> {
            if (err){
                return console.log(err)
            }
        })
        res.end(JSON.stringify(db[req.body.bsn]))
    })
})

//Read
router.get('/api/get', (req,res) => {
    fs.readFile(path, 'utf8',(err,data) => {res.end(data)})
})

router.get('/api/get/:bsn', (req,res) => {
    fs.readFile(path, 'utf8',(err,data) => {
        var db = JSON.parse(data)

        const person = db[  req.params.bsn]


        res.end(JSON.stringify(person))
    })
})

//Update
router.patch('/api/patch/:bsn',urlencodedParser,(req,res)=> {
    fs.readFile(path, 'utf8',(err,data) => {
        var db = JSON.parse(data);
        db[req.params.bsn].age = parseInt(req.body.age)
        fs.writeFile(path,JSON.stringify(db),'utf8',function (err) {
            if (err) {
                return console.log(err)
            }
        })
        res.end(JSON.stringify(db[req.params.bsn]));
    })
})
//Delete
router.delete('/api/delete/:bsn',(req,res) => {
    fs.readFile(path, 'utf8',(err,data) => {
        var db = JSON.parse(data)
        delete db[req.params.bsn]
        fs.writeFile(path,JSON.stringify(db),'utf8',(err) => {
            if (err) {
                return console.log(err)
            }
        })
        res.end(JSON.stringify(db));
    })
})

module.exports = router;
