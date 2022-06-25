const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    investor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    equity: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    comment: {
        type: String,
        required: true
    }
})

const pitchSchema = new Schema({
    entrepreneur: {
        type: String,
        required: true
    },
    pitchTitle: {
        type: String,
        required: true
    },
    pitchIdea: {
        type: String,
        required: true
    },
    askAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    equity: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    offers: [{
        type: Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    createdAt: {
        type: Date,
        default: Date.now
        // saving time so we can sort in reverse chronological order
    }
})

const Offer = mongoose.model('Offer', offerSchema);
const Pitch = mongoose.model('pitch', pitchSchema);

module.exports = {
    Offer,
    Pitch
};