// src/pages/AESPage.js
import React from 'react';
import CipherForm from '../components/CipherFormAES';
import { Grow } from '@mui/material';

function AESPage() {
    return (
        <Grow in={true} timeout={1000}>
            <div>
                <CipherForm/>
            </div>
        </Grow>
    );
}

export default AESPage;
