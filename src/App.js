// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';  
import CipherForm from './components/CipherForm'; 
import AESPage from './components/CipherFormAES';
import ElGamalPage from './pages/ElGamalPage'; 
import RC4Page from './pages/RC4Page'; 
import Footer from './components/Footer';
import HomePage from './components/HomePage'; 

import * as playfair from './algorithms/playfair';
import * as aes from './algorithms/AES/aes';
import * as rc4 from './algorithms/rc4';
import * as elgamal from './algorithms/elgamal';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} /> 
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
