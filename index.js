require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { Login , Register , Books , ConfBook , ConfBooked , getUserData} = require('./Controllers/controller');


const app = express();

app.use(cors({
    origin: "site_url",
    methods: ["GET", "POST", "PATCH"]
}   
));


app.use(express.json());

app.use((req , res , next) => {
  console.log(req.path, req.method)
  next()
})

app.post('/api/login', Login);

app.post('/api/register', Register);

app.get('/api/book' , Books);

app.get('/api/book/:id', ConfBook);

app.patch('/api/book/:id/:slotNumber/:userId', ConfBooked);

app.get('/api/userbooks/:userId', getUserData);

app.get('/logout', (req, res) => {
    res.redirect('/api/login');
});


mongoose.connect(process.env.MONGO_URI)
    .then(() =>{
        app.listen(process.env.PORT, () => {
            console.log('listening on port' , process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error.message)
    })
