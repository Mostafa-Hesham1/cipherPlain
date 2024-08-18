// src/pages/HomePage.js
import React from 'react';
import { Box, Typography, Button, Paper, Grow, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 4 }}>
            <Slide direction="down" in mountOnEnter unmountOnExit>
                <Typography variant="h2" gutterBottom align="center" sx={{ mt: 4 }}>
                    Welcome to the CipherPlain
                </Typography>
            </Slide>
            <Grow in timeout={1000}>
                <Paper elevation={6} sx={{ m: 2, p: 4, bgcolor: 'background.default' }}>
                    <Typography variant="h6" align="center" sx={{ mb: 3 }}>
                        Explore our Encryption Algorithms
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <Button variant="outlined" color="primary" onClick={() => handleNavigate('/playfair')}>
                            Playfair
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => handleNavigate('/aes')}>
                            AES
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => handleNavigate('/elgamal')}>
                            ElGamal
                        </Button>
                        <Button variant="outlined" color="primary" onClick={() => handleNavigate('/rc4')}>
                            RC4
                        </Button>
                    </Box>
                </Paper>
            </Grow>
           
        </Box>
    );
}

export default HomePage;
