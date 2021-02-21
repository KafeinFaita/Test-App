const express = require('express')
const User = require('../models/user')

const router = express.Router();


router.get('/', (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Users', users: result })
        })
        .catch(err => console.log(err))
})

router.get('/submit', (req, res) => {
    res.render('submit', { title: "Submit User" })
})

router.get('/update/:id', (req, res) => {
    User.findById(req.params.id)
        .then(result => {
            res.render('update', { title: "Update User", user: result })
        })
        .catch(err => console.log(err))
})

router.delete('/delete/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.send('Deleted'))
    .catch(err => console.log(err))
})

router.post('/submit', (req, res) => {
    const user = new User(req.body)

    user.save()
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
    
})

router.put('/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        grade: req.body.grade,
        section: req.body.section
    }, { new: true })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))    
})

router.get('*', (req, res) => {
    res.status(404).render('404', { title: "404 page" })
})

module.exports = router