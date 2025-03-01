const express = require('express');
const router = express.Router();
const Cake = require('../models/cakes');

// Create Cake
router.post('/cakes', async (req, res) => {
    try {
        const { name, quantity, price, description } = req.body;
        const newCake = new Cake({ name, quantity, price, description });
        await newCake.save();
        res.status(201).json(newCake);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Cakes
router.get('/cakes', async (req, res) => {
    try {
        const cakes = await Cake.find();
        res.status(200).json(cakes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Cake by ID
router.get('/cakes/:id', async (req, res) => {
    try {
        const cake = await Cake.findById(req.params.id);
        if (!cake) return res.status(404).json({ message: 'Cake not found' });
        res.status(200).json(cake);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Cake by ID
router.put('/cakes/:id', async (req, res) => {
    try {
        const { name, quantity, price, description } = req.body;
        const updatedCake = await Cake.findByIdAndUpdate(req.params.id, { name, quantity, price, description }, { new: true });
        if (!updatedCake) return res.status(404).json({ message: 'Cake not found' });
        res.status(200).json(updatedCake);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Cake
router.delete('/cakes/:id', async (req, res) => {
    try {
        const deletedCake = await Cake.findByIdAndDelete(req.params.id);
        if (!deletedCake) return res.status(404).json({ message: 'Cake not found' });
        res.status(200).json({ message: 'Cake deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
