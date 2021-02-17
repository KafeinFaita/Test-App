const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/user')

const app = express()

app.use(bodyParser.urlencoded({extended: false}));

const dbURI = "mongodb+srv://kafein:kafeinfaita@cluster0.3xefo.mongodb.net/test-db?retryWrites=true&w=majority"

const PORT = process.env.PORT || 3000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT))
    .catch(err => console.log(err))

app.set('view engine','ejs')

app.get('/', (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Users', users: result })
            console.log(result)
        })
        .catch(err => console.log(err))
})

app.get('/submit', (req, res) => {
    res.render('submit', { title: "Submit User" })
})

app.delete('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.send('Deleted'))
    .catch(err => console.log(err))
    console.log(req)
})

app.post('/submit', (req, res) => {
    const user = new User(req.body)

    user.save()
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
    
})


