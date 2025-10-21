// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Plan from './pages/Plan';
import Marketplace from './pages/Marketplace';
import Guides from './pages/Guides';
import Experiences from './pages/Experiences';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Tour360List from './pages/Tour360List';
import AaranyaAssistant from './components/AaranyaAssistant';
import ImageTest from './components/ImageTest';
// import AaranyaAssistant from './components/AaranyaAssistant'; // 👈 import assistant

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col relative">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/experiences/:id" element={<Experiences />} />
            <Route path="/destinations" element={<Explore />} />
            <Route path="/help" element={<Profile />} />
            <Route path="/contact" element={<Profile />} />
            <Route path="/privacy" element={<Profile />} />
            <Route path="/terms" element={<Profile />} />
            <Route path="/tour360" element={<Tour360List />} />
            <Route path="/test" element={<ImageTest />} />
          </Routes>
        </main>
        <Footer />

        {/* 👇 Floating Aaranya Assistant at bottom-right */}
        <div className="fixed bottom-5 right-5 z-50 w-80 shadow-xl rounded-2xl bg-white border">
          <AaranyaAssistant />
        </div>
      </div>
    </Router>
  );
}

export default App;
