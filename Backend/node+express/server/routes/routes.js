const express = require('express');
const router = express.Router();
const {
    Offer,
    Pitch
} = require('../model/model');


// Post Method to add new pitch
router.post('/pitches', async (req, res) => {

    const data = new Pitch({
        entrepreneur: req.body.entrepreneur,
        pitchTitle: req.body.pitchTitle,
        pitchIdea: req.body.pitchIdea,
        askAmount: req.body.askAmount,
        equity: req.body.equity
    })

    try {
        const dataToSave = await data.save();
        const dataToSend = {
            id: dataToSave._id,

        };
        //  console.log(dataToSave);
        res.status(201).json(dataToSend);
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
});


// Post Method to Make Counter Offer

router.post('/pitches/:pitch_id/makeOffer', async (req, res) => {
    const data = new Offer({
        investor: req.body.investor,
        amount: req.body.amount,
        equity: req.body.equity,
        comment: req.body.comment
    })

    try {
        try {
            const pitch = await Pitch.findById(req.params.pitch_id);
            if (pitch === null) {
                return res.status(404).json({
                    message: 'Pitch Not Found'
                });
            }
            try {
                const dataToSave = await data.save();
                const dataToSend = {
                    id: dataToSave._id
                };
                pitch.offers.push(data);
                pitch.save();
                //console.log(dataToSave);
                res.status(201).json(dataToSend);
            } catch (error) {
                res.status(400).json({
                    message: error
                });
            }

        } catch (error) {
            res.status(404).json({
                message: error
            });
        }
    } catch (error) {
        //console.log(error);
        res.status(404).json({
            message: error
        });
    }
});



// Get Method to get all pitches ( in reverse Cronological order)
router.get('/pitches', (req, res) => {
    Pitch.find().select('-createdAt').populate('offers').sort({
        createdAt: -1
    }).exec((err, pitches) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.json(pitches);
    });
});



// Get Method to get single pitch
router.get('/pitches/:id', async (req, res) => {
    try {
        const pitch = await Pitch.findById(req.params.id).select('-createdAt').populate('offers');

        if (!pitch) {
            return res.status(404).json({
                message: 'Pitch Not Found'
            });
        }
        res.status(200).json(pitch);
    } catch (error) {
        res.status(400).json({
            message: error
        });
    }
})

module.exports = router;