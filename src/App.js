// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';  // Adjust import path if necessary
import CipherForm from './components/CipherForm';  // Playfair Cipher component
import AESPage from './components/CipherFormAES';  // AES component
import ElGamalPage from './pages/ElGamalPage';  // ElGamal component
import RC4Page from './pages/RC4Page';  // RC4 component
import Footer from './components/Footer';

// Import your algorithm modules
import * as playfair from './algorithms/playfair';
import * as aes from './algorithms/AES/aes';
import * as rc4 from './algorithms/rc4';
import * as elgamal from './algorithms/elgamal';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<h2>Welcome to My Cipher Project</h2>} />
                <Route path="/playfair" element={<CipherForm algorithms={{ playfair }} />} />
                <Route path="/aes" element={<AESPage algorithms={{ aes }} />} />
                <Route path="/elgamal" element={<ElGamalPage algorithms={{ elgamal }} />} />
                <Route path="/rc4" element={<RC4Page algorithms={{ rc4 }} />} />
                <Route path="/calculators" element={<h2>Online Calculators</h2>} />
            </Routes>
            <Footer />

        </Router>
    );
}

export default App;
