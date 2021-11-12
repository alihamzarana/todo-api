const express = require('express')

const mongoose= require('mongoose')
const jwt = require("jsonwebtoken");


const app = express()
const cors = require("cors");
const todoRoutes = require('./routes/todoroutes')
const userRoutes = require('./routes/userRoutes')

app.listen(3000);
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cors());

// app.post('/api/login', (req, res) =>{
//      const user = {
//        _id: 1,
//        userName: "adsd",
//        email: "asd@gmail.com",
//      };
//      jwt.sign({ user }, "secretkey", (err, token) => {
//        res.json({
//          token: token,
//        });
//      });
// })

// todo route



// app.get('/',(req, res) =>{
//     res.send('helllo')
// })
app.use('/todo', todoRoutes)
app.use('/user', userRoutes)

const dbURI = 'mongodb://localhost:27017/node-todoapp'

mongoose.connect(dbURI)
.then(result => {
    console.log('db connected')
})
.catch(error => console.log(error))

