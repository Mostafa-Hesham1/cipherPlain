import React, { useState } from 'react';
import { encrypt, decrypt, hexStringToByteArray, byteArrayToHexString } from '../algorithms/aes';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Grid,
    Grow,
} from '@mui/material';

function AESPage() {
    const [key, setKey] = useState('');
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [mode, setMode] = useState('encrypt');
    const [bitSize, setBitSize] = useState(128);

    const handleCipher = () => {
        if (!key || !text) {
            alert('Both key and text fields must be filled.');
            return;
        }
        
        if (key.length !== bitSize / 4) {
            alert(`Key must be ${bitSize / 4} hex characters long for a ${bitSize}-bit key.`);
            return;
        }

        let output;
        if (mode === 'encrypt') {
            output = encrypt(text, key);
        } else {
            output = decrypt(text, key);
        }
        setResult(output);
    };

    const generateKey = () => {
        const keyBytes = crypto.getRandomValues(new Uint8Array(bitSize / 8));
        setKey(byteArrayToHexString(keyBytes));
    };

    return (
        <Grow in={true} timeout={1000}>
            <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>
                <Paper elevation={4} sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h3" align="center" gutterBottom>
                        AES Encryption/Decryption Tool
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Key (hex)"
                                fullWidth
                                variant="outlined"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                margin="normal"
                                helperText={`Enter a ${bitSize}-bit hexadecimal key.`}
                            />
                            <TextField
                                label="Text to Encrypt/Decrypt (hex)"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                margin="normal"
                                helperText="Enter the text in hexadecimal."
                            />
                            <FormControl component="fieldset" sx={{ margin: '20px 0' }}>
                                <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value)}>
                                    <FormControlLabel value="encrypt" control={<Radio />} label="Encrypt" />
                                    <FormControlLabel value="decrypt" control={<Radio />} label="Decrypt" />
                                </RadioGroup>
                            </FormControl>
                            <Button variant="contained" color="primary" onClick={generateKey} fullWidth sx={{ marginBottom: '20px' }}>
                                Generate Random Key
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleCipher} fullWidth sx={{ padding: '10px 0', fontSize: '16px' }}>
                                {mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {result && (
                                <>
                                    <Typography variant="h5" gutterBottom sx={{ marginTop: '20px' }}>
                                        Result:
                                    </Typography>
                                    <Paper elevation={2} sx={{ padding: 2, backgroundColor: '#e3f2fd', wordWrap: 'break-word' }}>
                                        <Typography variant="h6">{result}</Typography>
                                    </Paper>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Grow>
    );
}

export default AESPage;
