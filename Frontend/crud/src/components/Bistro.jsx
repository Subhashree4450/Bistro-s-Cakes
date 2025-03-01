import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Bistro.css';

const API_URL = 'http://localhost:5000/api/cakes';

const Bistro = () => {
    const [cakes, setCakes] = useState([]);
    const [form, setForm] = useState({ name: '', quantity: '', price: '', description: '' });
    const [editId, setEditId] = useState(null);

    // Fetch Cakes
    const fetchCakes = async () => {
        try {
            const response = await axios.get(API_URL);
            setCakes(response.data);
        } catch (error) {
            console.error('Error fetching cakes:', error);
        }
    };

    useEffect(() => {
        fetchCakes();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add or Update Cake
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, form);
            } else {
                await axios.post(API_URL, form);
            }
            setForm({ name: '', quantity: '', price: '', description: '' });
            setEditId(null);
            fetchCakes();
        } catch (error) {
            console.error('Error adding/updating cake:', error);
        }
    };

    // Edit Cake
    const handleEdit = (cake) => {
        setForm({ name: cake.name, quantity: cake.quantity, price: cake.price, description: cake.description });
        setEditId(cake._id);
    };

    // Delete Cake
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchCakes();
        } catch (error) {
            console.error('Error deleting cake:', error);
        }
    };

    return (
        <div className="container">
            <h1>Bistro Cafe's - Cake Management</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Cake Name" required />
                <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required />
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
                <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
                <button type="submit">{editId ? 'Update Cake' : 'Add Cake'}</button>
            </form>

            <h2>Cake List</h2>
            <ul>
                {cakes.map((cake) => (
                    <li key={cake._id}>
                        <strong>{cake.name}</strong>
                        <span className="details"> {cake.quantity} kg in Rs.{cake.price}, description:"{cake.description}" </span>
                        <div className="actions">
                            <button onClick={() => handleEdit(cake)}> Edit</button>
                            <button onClick={() => handleDelete(cake._id)}>🗑 Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bistro;
