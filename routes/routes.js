const express = require('express')
const {
    index_get,
    submit_get,
    submit_id_get,
    delete_id,
    submit_post,
    put_id,
    not_found_get
}  = require('../controllers/controllers')

const router = express.Router();


router.get('/', index_get)
router.get('/submit', submit_get)
router.get('/update/:id', submit_id_get)
router.delete('/delete/:id', delete_id)
router.post('/submit', submit_post)
router.put('/update/:id', put_id)
router.get('*', not_found_get)

module.exports = router