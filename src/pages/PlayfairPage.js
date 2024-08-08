// src/pages/PlayfairPage.js
import React from 'react';
import CipherForm from '../components/CipherForm';
import { Grow } from '@mui/material';

function PlayfairPage() {
    return (
        <Grow in={true} timeout={1000}>
            <div>
                <CipherForm />
            </div>
        </Grow>
    );
}

export default PlayfairPage;
