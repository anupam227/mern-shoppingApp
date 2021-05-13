const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
// item model
const Items = require('../../models/item');

// @routes GET api/items
router.get('/', (req,res) => {
    Items.find()
    .sort({ date: -1}) 
    .then(items => res.json(items))
    .catch(err => {
        res.status(401).json({
            message: "Cannot get items",
            error: err
        })
    })
});

// @routes POST api/items
router.post('/', auth, (req,res) => {
    const newItem = new Items({
        name: req.body.name
    })
    newItem.save()
    .then(item => {
        res.status(200).json(item)
    })
    
});


// @routes DELETE api/items
router.delete('/:id', auth, (req,res) => {
     Items.deleteOne({ _id: req.params.id }, (err, results) => {
         if(err){
             return res.status(400).json({success: false})
         }
         res.status(201).json({success: true})
    })
})



module.exports = router;