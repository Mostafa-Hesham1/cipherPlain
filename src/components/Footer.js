// src/components/Footer.js
import React from 'react';
import { Box, Typography, Link, Container, Grid } from '@mui/material';

function Footer() {
    return (
        <Box sx={{ backgroundColor: '#333', color: 'white', py: 4, mt: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            CipherPlain
                        </Typography>
                        <Typography variant="body2">
                            Explore different cryptographic algorithms and understand their applications in securing data.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Algorithms
                        </Typography>
                        <ul>
                            <li>
                                <Link href="/playfair" color="inherit" sx={{ textDecoration: 'none' }}>
                                    Playfair Cipher
                                </Link>
                            </li>
                            <li>
                                <Link href="/aes" color="inherit" sx={{ textDecoration: 'none' }}>
                                    AES
                                </Link>
                            </li>
                            <li>
                                <Link href="/elgamal" color="inherit" sx={{ textDecoration: 'none' }}>
                                    ElGamal
                                </Link>
                            </li>
                            <li>
                                <Link href="/rc4" color="inherit" sx={{ textDecoration: 'none' }}>
                                    RC4
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Learning Resources
                        </Typography>
                        <ul>
                            <li>
                                <Link href="https://www.geeksforgeeks.org/playfair-cipher-with-examples/" target="_blank" rel="noopener" color="inherit" sx={{ textDecoration: 'none' }}>
                                    Playfair Cipher Tutorial
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.geeksforgeeks.org/advanced-encryption-standard-aes/" target="_blank" rel="noopener" color="inherit" sx={{ textDecoration: 'none' }}>
                                    AES Tutorial
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.geeksforgeeks.org/elgamal-encryption-algorithm/" target="_blank" rel="noopener" color="inherit" sx={{ textDecoration: 'none' }}>
                                    ElGamal Tutorial
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.geeksforgeeks.org/rc4-encryption-algorithm/" target="_blank" rel="noopener" color="inherit" sx={{ textDecoration: 'none' }}>
                                    RC4 Tutorial
                                </Link>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Contact
                        </Typography>
                        <Typography variant="body2">
                            Email: support@cipherplain.com
                        </Typography>
                        <Typography variant="body2">
                            Phone: +123 456 7890
                        </Typography>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={5} pb={2}>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} CipherPlain. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
