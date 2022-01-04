const express = require('express')
// const mongoose = require('mongoose')
const monk = require('monk')
const Joi = require('@hapi/joi')

const router = express.Router();


const db = monk(process.env.MONGO_URI)
const cy_test = db.get('cy_test')

// const schema = Joi.object({
//     question: Joi.string() .required(),
//     answer: Joi.string() .require(),
//     video_url: Joi.string() .uri()
// });

const Schema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    video_url: Joi.string().uri()
});


// read all
router.get('/', async (req, res, next) => {
    try {
        const items = await cy_test.find({})
        res.json(items)
    } catch (e) {
        next(error);
    }
})

// read one

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const item = await cy_test.findOne({
            _id: id,
        })
        if (!item) return next();
        return res.json(item)

    } catch (error) {
        next(error)
    }
})

// Create one
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const value = await Schema.validateAsync(req.body)
        const inserted = await cy_test.insert(value)
        res.json(inserted)

    } catch (error) {
        next(error)
    }

})

// Update one
router.put('/:id', async (req, res, next) => {

    try {
        const {id} = req.params

        const item = await cy_test.findOne({
            _id: id,
        })
        if (!item) return next();
        console.log(req.body)
        const value = await Schema.validateAsync(req.body)
        const updated = await cy_test.update({
            _id:id,
        },{
            $set : value
        })
        res.json(updated)

    } catch (error) {
        next(error)
    }

})

// Deelete One
router.delete('/:id', async (req, res, next) => {

    try {
        const {id} = req.params;
        await cy_test.remove({_id:id});
        res.status(200).send('Success')
    }catch (error) {
        next(error)
    }

})


module.exports = router