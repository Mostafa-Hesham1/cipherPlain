import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Radio, RadioGroup, FormControl, FormControlLabel, Grid, Grow } from '@mui/material';
import { encrypt as aesEncrypt, decrypt as aesDecrypt, byteArrayToHexString, hexStringToByteArray } from '../algorithms/AES/aes';

function CipherForm() {
    const [key, setKey] = useState('');
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [mode, setMode] = useState('encrypt');
    const bitSize = 128;

    const isHexString = (str) => {
        const hexRegEx = /^[0-9a-fA-F]+$/;
        return hexRegEx.test(str.replace(/\s+/g, '')); // Ignore spaces when testing for valid hex string
    };

    const stringToHex = (str) => {
        return str
            .split('')
            .map(c => c === ' ' ? '20' : c.charCodeAt(0).toString(16).padStart(2, '0')) // Convert spaces to '20'
            .join('');
    };

    function hexToString(hex) {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            const code = parseInt(hex.substr(i, 2), 16);
            str += String.fromCharCode(code);
        }
        return str;
    }

    const handleCipher = () => {
        if (!key || !text) {
            alert('Both key and text fields must be filled.');
            return;
        }
    
        let inputText = text.trim();
        // Convert text to hex if it's not already in hex format
        if (!isHexString(inputText)) {
            inputText = stringToHex(inputText);
        }
    
        let inputKey = key.trim();
        // Convert key to hex if it's not already in hex format
        if (!isHexString(inputKey)) {
            inputKey = stringToHex(inputKey);
        }
    
        let output;
        if (mode === 'encrypt') {
            output = aesEncrypt(inputText, inputKey);
        } else {
            output = aesDecrypt(inputText, inputKey);
        }
        setResult(hexToString(output));
    };
    

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;

                const lines = fileContent.split(/\r?\n/); // Split by both \r\n and \n

                let extractedKey = '';
                let extractedText = '';

                for (let line of lines) {
                    line = line.trim();  // Remove any leading/trailing whitespace
                    if (line.startsWith('Key:')) {
                        extractedKey = line.replace('Key:', '').trim();
                    } else if (line.startsWith('Text:')) {
                        extractedText = line.replace('Text:', '').trim();
                    }
                }

                setKey(extractedKey);
                setText(extractedText);
            };
            reader.readAsText(file);
        }
    };

    return (
        <Grow in={true} timeout={1000}>
            <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>
                <Paper elevation={4} sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h3" align="center" gutterBottom>
                        AES Cipher Tool
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Encryption Key (hex)"
                                fullWidth
                                variant="outlined"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                margin="normal"
                                helperText={`Enter a ${bitSize}-bit hexadecimal key.`}
                            />
                            <TextField
                                label="Text to Encrypt/Decrypt (hex or string)"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                margin="normal"
                                helperText="Enter the text in hexadecimal format or as a plain string."
                            />
                            <FormControl component="fieldset" sx={{ margin: '20px 0' }}>
                                <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value)}>
                                    <FormControlLabel value="encrypt" control={<Radio />} label="Encrypt" />
                                    <FormControlLabel value="decrypt" control={<Radio />} label="Decrypt" />
                                </RadioGroup>
                            </FormControl>
                            <Button variant="contained" component="label" fullWidth sx={{ marginBottom: '20px' }}>
                                Upload Text File
                                <input type="file" accept=".txt" hidden onChange={handleFileUpload} />
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

export default CipherForm;
