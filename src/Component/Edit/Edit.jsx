import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditInventory = () => {
    const { id } = useParams(); // Get the inventory ID from the URL parameters
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        quantity: ''
    });

    useEffect(() => {
        // Fetch the inventory item by ID
        const fetchInventoryById = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/task/find/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response.data)
                const inventory = response.data.inventory;
                setFormData({
                    name: inventory.name,
                    date: inventory.receivedDate.split('T')[0], // Adjust date format if needed
                    quantity: inventory.receivedQuantity,
                });
            } catch (error) {
                console.error("Error fetching inventory data:", error);
                toast.error("Failed to load inventory data");
            }
        };

        fetchInventoryById();
    }, [id]);

    // Handle form change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/task/update/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success("Inventory updated successfully");
            navigate('/'); // Navigate back to the home page or inventory list
        } catch (error) {
            console.error("Error updating inventory:", error);
            toast.error("Failed to update inventory");
        }
    };

    return (
        <div className="register">
            <div className="card">
                <div>
                    <h1>Edit Inventory</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <select
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    >
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                        <option value="C3">C3</option>
                        <option value="C4">C4</option>
                        <option value="C5">C5</option>
                    </select>

                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />

                    <label htmlFor="quantity">Item Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                    />

                    <button type="submit" className="sign-in">Update</button>
                </form>
            </div>
        </div>
    );
};

export default EditInventory;
