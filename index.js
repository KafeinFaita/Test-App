const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes/routes')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + "/public"))

// "mongodb+srv://kafein:kafeinfaita@cluster0.3xefo.mongodb.net/test-db?retryWrites=true&w=majority"

const dbURI = "mongodb+srv://kafein:kafeinfaita@cluster0.3xefo.mongodb.net/test-db?retryWrites=true&w=majority" || "mongodb://localhost:27017/test-db"

const PORT = process.env.PORT || 3000;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => app.listen(PORT))
    .catch(err => console.log(err))

app.set('view engine','ejs')

app.use(routes)


