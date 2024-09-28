// models/Visitor.js
const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    serialNumber: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    fatherOrHusbandName: { type: String, required: true },
    houseNumber: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    business: { type: String, required: true },
    gender: { type: String, required: true },
    education: { type: String, required: true },
    isWinner: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Visitor', visitorSchema);

