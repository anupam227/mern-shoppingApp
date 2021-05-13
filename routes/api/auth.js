const express = require('express');
const router = express.Router();
const User = require('../../models/user')
const auth = require('../../middleware/auth');

router.get('/user',auth, (req, res) => {
    const id = localStorage.getItem('user')
    User.findById(id)
    .select('-password')
    .then(user => res.json(user))
    .catch(err => {
        res.status(401).json(err)
    });
})

module.exports = router;