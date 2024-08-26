import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to the login page
    };

    return (
        <div className='nav'>
            <div className='nav-part'>
                <Link to={'/'}>
                    <h1>Inventory Management System</h1>
                </Link>
                {/* Only show Admin link if on home page */}
                {location.pathname !== '/dashboard' && (
                    <Link to={'/dashboard'}>
                        <h1>Admin</h1>
                    </Link>
                )}
            </div>
            <div className='nav-part'>
                <Link to={'/QR-generate'}>
                    <h3>Generate QR Code</h3>
                </Link>
                <Link to={'/QR-scan'}>
                    <h3>Scan QR Code</h3>
                </Link>
            </div>
            <div className='nav-part'>
                {isAuthenticated ? (
                    <button onClick={handleLogout} className='btn1'>Logout</button>
                ) : (
                    <>
                        <Link to={'/login'} className='btn'>Sign-in</Link>
                        <Link to={'/register'} className='btn1'>Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
