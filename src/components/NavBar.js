// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function NavBar() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const drawer = (
        <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/playfair">
                    <ListItemText primary="Playfair Cipher" />
                </ListItem>
                <ListItem button component={Link} to="/aes">
                    <ListItemText primary="AES" />
                </ListItem>
                <ListItem button component={Link} to="/elgamal">
                    <ListItemText primary="ElGamal" />
                </ListItem>
                <ListItem button component={Link} to="/rc4">
                    <ListItemText primary="RC4" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#333', marginBottom: 4 }}>
            <Toolbar>
                {isMobile ? (
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                            {drawer}
                        </Drawer>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            CipherPlain
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                            CipherPlain
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button color="inherit" component={Link} to="/" sx={{ fontWeight: 'bold' }}>
                                Home
                            </Button>
                            <Button color="inherit" component={Link} to="/playfair" sx={{ fontWeight: 'bold' }}>
                                Playfair Cipher
                            </Button>
                            <Button color="inherit" component={Link} to="/aes" sx={{ fontWeight: 'bold' }}>
                                AES
                            </Button>
                            <Button color="inherit" component={Link} to="/elgamal" sx={{ fontWeight: 'bold' }}>
                                ElGamal
                            </Button>
                            <Button color="inherit" component={Link} to="/rc4" sx={{ fontWeight: 'bold' }}>
                                RC4
                            </Button>
                        </Box>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
