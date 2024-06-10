import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/user/Signup';
import OtpPage from './pages/user/Otp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OtpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
