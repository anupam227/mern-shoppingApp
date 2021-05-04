const express = require('express');
const router = express.Router();

// item model
const Items = require('../../models/item');

// @routes GET api/items
router.get('/', (req,res) => {
    Items.find()
    .exec((err, items) => {
        if(err){
            return res.status(400).json({
                error: "No Items Found"
            })
        }
        res.json(items)
    })
    // .sort({ date: -1}) 
    // .then(items => res.json(items));
});

// @routes POST api/items
router.post('/', (req,res) => {
    const newItem = new Items({
        name: req.body.name
    })
    newItem.save()
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err => {
        res.status(500).json({
            message: "Cannot store item",
            error: err
        })
    });
});


// @routes DELETE api/items
router.delete('/:id', (req,res) => {
     Items.deleteOne({ _id: req.params.id }, (err, results) => {
         if(err){
             return res.status(400).json({success: false})
         }
         res.status(201).json({success: true})
    })
})



module.exports = router;