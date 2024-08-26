import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Component/Login/Login';
import Generate from './Component/QR_Generate/Generate';
import Scan from './Component/QR_Scan/Scan';
import Register from './Component/Register/Register';
import ProtectedRoute from '../src/protectedroute/ProtectedRoute'; // Import the ProtectedRoute component
import EditInventory from './Component/Edit/Edit';
// import Home from './Component/Home/Home';
import Home1 from './Component/Home/Home';
import Dashboard from './Component/Home/Dashboard';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route path="/" element={ 
             <ProtectedRoute>
               <Home1/>
             </ProtectedRoute>
            }/>
          <Route path="/dashboard" element={ <Dashboard/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/QR-generate"
            element={
              <ProtectedRoute>
                <Generate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/QR-scan"
            element={
              <ProtectedRoute>
                <Scan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditInventory/>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
