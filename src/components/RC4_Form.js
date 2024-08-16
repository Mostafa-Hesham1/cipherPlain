import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Radio, RadioGroup, FormControl, FormControlLabel, Grid, Grow } from '@mui/material';
import { rc4Encrypt, rc4Decrypt } from "../algorithms/rc4";

function CipherForm() {
    const [key, setKey] = useState('');
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [mode, setMode] = useState('encrypt');

    const handleCipher = () => {
        const output = mode === 'encrypt' ? rc4Encrypt(text, key) : rc4Decrypt(text, key);
        setResult(output.ciphertext);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const lines = fileContent.split(/\r?\n/);
                let extractedKey = '';
                let extractedText = '';

                for (let line of lines) {
                    line = line.trim();
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
                        RC4 Cipher Tool
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Encryption Key"
                                fullWidth
                                variant="outlined"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                margin="normal"
                                helperText="Enter a key for the RC4 algorithm."
                            />
                            <TextField
                                label="Text to Encrypt/Decrypt"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                margin="normal"
                                helperText="Enter the text to be processed."
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
                            <Button variant="contained" color="primary" onClick={handleCipher} fullWidth sx={{ padding: '10px 0', fontSize: '16px' }}>
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
