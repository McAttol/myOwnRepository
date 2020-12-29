const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();

const port= 4200;

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost/UsersQRCode")

app.use("/users", (req, res)=>{
    Users.find({}, (error, list)=>{
        var usersList = {};
        list.forEach((user) => {
            usersList[user._id]= user;
        });

        res.json(usersList)
    })
})

app.get('/', (req, res)=>{
    res.send('Hola!')
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}!`)
})