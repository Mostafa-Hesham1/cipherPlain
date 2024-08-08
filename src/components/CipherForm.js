import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Radio, RadioGroup, FormControl, FormControlLabel, Grid, Grow } from '@mui/material';
import { playfairEncrypt, playfairDecrypt } from '../algorithms/playfair';

function CipherForm() {
    const [key, setKey] = useState('');
    const [text, setText] = useState('');
    const [result, setResult] = useState('');
    const [steps, setSteps] = useState([]);
    const [matrix, setMatrix] = useState([]);
    const [mode, setMode] = useState('encrypt');

    const handleCipher = () => {
        const output = mode === 'encrypt' ? playfairEncrypt(text, key) : playfairDecrypt(text, key);
        setResult(output.encryptedText || output.decryptedText);
        setSteps(output.steps);
        setMatrix(output.matrix);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target.result;
    
                console.log('File Content:', fileContent);  // Debug: Log the full file content
    
                const lines = fileContent.split(/\r?\n/);  // Split by both \r\n and \n
                console.log('File Lines:', lines);  // Debug: Log the split lines
    
                let extractedKey = '';
                let extractedText = '';
                let isTextSection = false;
    
                for (let line of lines) {
                    line = line.trim();  // Remove any leading/trailing whitespace and \r
                    if (line.startsWith('Key:')) {
                        extractedKey = line.replace('Key:', '').trim();
                        console.log('Extracted Key:', extractedKey);  // Debug: Log the extracted key
                    } else if (line.startsWith('Text:')) {
                        isTextSection = true; // Flag that we are now in the text section
                        console.log('Text Section Detected');
                        extractedText = line.replace('Text:', '').trim();  // Directly extract text after 'Text:'
                        console.log('Extracted Text:', extractedText);  // Debug: Log the extracted text
                    }
                }
    
                // Set extracted key and text to state
                setKey(extractedKey);
                setText(extractedText);
                console.log('Final Extracted Text:', extractedText);  // Debug: Log the final text
            };
            reader.readAsText(file);
        }
    };
    
    return (
        <Grow in={true} timeout={1000}>
            <Box sx={{ maxWidth: 1000, margin: 'auto', padding: 4 }}>
                <Paper elevation={4} sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h3" align="center" gutterBottom>
                        Playfair Cipher Tool
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
                                helperText="Enter a key without repeating letters."
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
                                    <Typography variant="h6" gutterBottom sx={{ marginTop: '20px' }}>
                                        Cipher Matrix:
                                    </Typography>
                                    <TableContainer component={Paper} sx={{ marginBottom: '20px' }}>
                                        <Table size="small">
                                            <TableBody>
                                                {matrix.map((row, rowIndex) => (
                                                    <TableRow key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <TableCell key={cellIndex} align="center" sx={{ border: 1, padding: '8px', fontWeight: 'bold', backgroundColor: '#e0f7fa' }}>
                                                                {cell}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </>
                            )}
                        </Grid>
                    </Grid>
                    {steps.length > 0 && (
                        <Paper elevation={3} sx={{ padding: 3, backgroundColor: '#fff3e0' }}>
                            <Typography variant="h5" gutterBottom>
                                Detailed Steps:
                            </Typography>
                            {steps.map((step, index) => (
                                <Box key={index} sx={{ marginBottom: '10px', padding: '10px', borderRadius: '8px', backgroundColor: '#ffe0b2' }}>
                                    <Typography variant="body1">{step}</Typography>
                                </Box>
                            ))}
                        </Paper>
                    )}
                </Paper>
            </Box>
        </Grow>
    );
}

export default CipherForm;
