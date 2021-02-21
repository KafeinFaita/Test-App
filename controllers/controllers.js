const User = require('../models/user')

const index_get = (req, res) => {
    User.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { title: 'All Users', users: result })
        })
        .catch(err => console.log(err))
}

const submit_get = (req, res) => {
    res.render('submit', { title: "Submit User" })
}

const submit_id_get = (req, res) => {
    User.findById(req.params.id)
        .then(result => {
            res.render('update', { title: "Update User", user: result })
        })
        .catch(err => console.log(err))
}

const delete_id = (req, res) => {
    User.findByIdAndDelete(req.params.id)
    .then(() => res.send('Deleted'))
    .catch(err => console.log(err))
}

const submit_post = (req, res) => {
    const user = new User(req.body)

    user.save()
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
    
}

const put_id = (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        grade: req.body.grade,
        section: req.body.section
    }, { new: true })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))    
}

const not_found_get = (req, res) => {
    res.status(404).render('404', { title: "404 page" })
}

module.exports = {
    index_get,
    submit_get,
    submit_id_get,
    delete_id,
    submit_post,
    put_id,
    not_found_get
}