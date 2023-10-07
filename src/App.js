import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Axios from 'axios';
import DiscographyCComponent from "./components/DiscographyCComponent";
import DiscographyMNComponent from "./components/DiscographyMNComponent";
import DiscographyOComponent from "./components/DiscographyOComponent";
import HistoryComponent from "./components/HistoryComponent";
import MerchComponent from "./components/MerchComponent";
import PublicationsComponent from "./components/PublicationsComponent";
import StartComponent from "./components/StartComponent";
import LoginComponent from "./components/LoginComponent";
import DashboardComponent from "./components/DashboardComponent";
import RegisterComponent from './components/RegisterComponent';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios.get('/api/user')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUser(null);
      });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartComponent user={user} />} />
          <Route path="DC-C" element={<DiscographyCComponent user={user} />} />
          <Route path="DMN-C" element={<DiscographyMNComponent user={user} />} />
          <Route path="DO-C" element={<DiscographyOComponent user={user} />} />
          <Route path="H-C" element={<HistoryComponent user={user} />} />
          <Route path="M-C" element={<MerchComponent user={user} />} />
          <Route path="P-C" element={<PublicationsComponent user={user} />} />
          <Route path="R-C" element={<RegisterComponent />} />
          <Route path="L-C" element={<LoginComponent />} />
          <Route path="D-C" element={<DashboardComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
