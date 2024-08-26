import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    // handleDelete function
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://backend-task-c21p.onrender.com/task/delete/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success("Item deleted successfully");
            // Update the state to remove the deleted item from the UI
            const updatedData = data.filter((item) => item._id !== id);
            setData(updatedData);
        } catch (error) {
            toast.error("Error deleting item");
            console.error("Error deleting item:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get('https://backend-task-c21p.onrender.com/task/findAll-inventory',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setData(response.data.allInventory); // Update the state with fetched data
                console.log(response.data, "findAll-inventory");
            } catch (error) {
                console.error("Error fetching inventory data:", error);
            }
        };

        fetchInventory();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript, so add 1
        const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year
        return `${day}-${month}-${year}`; // Return in DD-MM-YY format
    };

    return (
        <div className="container">
            {data.length > 0 ? ( // Check if there's data to display
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date Received/Quantity</th>
                            <th>Date Dispatched/Quantity</th>
                            <th>Pending Items</th>
                            <th>Status</th>
                            <th>QR Code (Click to download)</th>
                            <th>Admin Panel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{formatDate(item.receivedDate)}/{item.receivedQuantity}</td>
                                <td>
                                    {item.dispatchDate ? formatDate(item.dispatchDate) : "------"}/{item.dispatchQuantity}
                                </td>
                                <td>{item.pendingItems}</td>
                                <td>{item.status}</td>
                                <td>
                                    <a href={item.qrCode} download={`QRCode_${item.name}.webp`}>
                                        <img src={item.qrCode} alt="QR Code" className="qr-code" />
                                    </a>
                                </td>
                                <td>
                                    <button onClick={() => handleEdit(item._id)} className="edit-button">
                                        <i className="ri-pencil-fill"></i>
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="delete-button"><i className="ri-delete-bin-5-line"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : ( // Display this if no data is available
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>Data not found</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
