import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Companies from './components/Companies';
import CompanyDetail from './components/CompanyDetail';
import Interview from './components/Interview';
import InterviewResults from './components/InterviewResults';
import Pricing from './components/Pricing';
import Profile from './components/Profile';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:companyId" element={<CompanyDetail />} />
          <Route path="/interview/:companyId/:categoryId" element={<Interview />} />
          <Route path="/interview/:companyId/:categoryId/results" element={<InterviewResults />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;