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
import EditDestination from './pages/EditDestination';
import AddActivity from './pages/AddActivity';
import EditActivity from './pages/EditActivity';

function App() {
  const [destinations, setDestinations] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/layout" element={<Layout />} >
          <Route path="/layout/login" element={<Login />} />
          <Route path="/layout/home" element={<Home destinations={destinations} setDestinations={setDestinations} />} />
          <Route path="/layout/home/destination/:id" element={<DestinationDetails destinations={destinations} setDestinations={setDestinations} />} />
          <Route path="/layout/home/destination/:id/edit" element={<EditDestination destinations={destinations} setDestinations={setDestinations} />} />
          <Route path="/layout/home/destination/:id/add-activity" element={<AddActivity />} />
          <Route path="/layout/home/destination/:id/activity/:activityID/edit" element={<EditActivity />} />
          <Route path="/layout/destinations" element={<Destination />} />
          <Route path="/layout/activitylog" element={<ActivityLog />} />
          <Route path="/layout/*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
