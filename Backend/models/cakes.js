const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;
