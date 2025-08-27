import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Destination from "./pages/AddDestination";
import NoPage from "./pages/NoPage";
import ActivityLog from './pages/ActivityLog';
import Splash from './pages/Splash';
import Login from './pages/Login';
import DestinationDetails from './pages/DestinationDetails';
import AddActivity from './pages/AddActivity';
import AddActivityLog from './pages/AddActivityLog';
import EditActivity from './pages/EditActivity';
import ProtectedRoute from './pages/ProtectedRoute';
import EditActivityLog from './pages/EditActivityLog';
import Profile from './pages/Profile';


function App() {
  const [destinations, setDestinations] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/layout" element={<Layout />} >
          <Route path="/layout/login" element={<Login />} />
          <Route path="/layout/home" element={<ProtectedRoute><Home destinations={destinations} setDestinations={setDestinations} /></ProtectedRoute>} />
          <Route path="/layout/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/layout/home/destination/:id" element={<ProtectedRoute><DestinationDetails destinations={destinations} setDestinations={setDestinations} /></ProtectedRoute>} />
          <Route path="/layout/home/destination/:id/add-activity" element={<ProtectedRoute><AddActivity /></ProtectedRoute>} />
          <Route path="/layout/home/destination/:id/activity/:activityID/edit" element={<EditActivity />} />
          <Route path="/layout/destinations" element={<ProtectedRoute><Destination /></ProtectedRoute>} />
          <Route path="/layout/activitylog" element={<ProtectedRoute><ActivityLog /></ProtectedRoute>} />
          <Route path="/layout/home/destination/:id/activity/:activityID/add-memory" element={<ProtectedRoute><AddActivityLog /></ProtectedRoute>} />
          <Route path="/layout/home/destination/:id/activity/:activityID/memory/:memoryID/edit" element={<ProtectedRoute><EditActivityLog /></ProtectedRoute>} />
          <Route path="/layout/*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
