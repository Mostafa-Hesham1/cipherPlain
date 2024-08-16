import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid, Grow } from '@mui/material';
import { elGamalEncrypt, elGamalDecrypt } from '../algorithms/elgamal.js';

function ElGamalForm() {
    const [alice, setAlice] = useState({ p: '', g: '', x: '' });
    const [bob, setBob] = useState({ r: '', m: '' });
    const [publicKey, setPublicKey] = useState({ p: '', g: '', h: '' });
    const [encryptedMessage, setEncryptedMessage] = useState({ c1: '', c2: '' });
    const [decryptedMessage, setDecryptedMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState(false);
    const [publicKeyGenerated, setPublicKeyGenerated] = useState(false);
    const [errors, setErrors] = useState({});

    const handleAliceChange = (e) => {
        setAlice({ ...alice, [e.target.name]: e.target.value });
        validateField(e.target.name, e.target.value);
    };

    const handleBobChange = (e) => {
        setBob({ ...bob, [e.target.name]: e.target.value });
        validateField(e.target.name, e.target.value);
    };

    const validateField = (name, value) => {
        let newErrors = { ...errors };
        switch (name) {
            case 'p':
                newErrors.p = !isPrime(parseInt(value)) ? 'Must be a prime number' : '';
                break;
            case 'g':
                if (alice.p && value) {
                    newErrors.g = !isPrimitiveRoot(parseInt(value), parseInt(alice.p)) 
                        ? 'g is not a primitive root modulo p' 
                        : '';
                }
                break;
            case 'x':
            case 'r':
            case 'm':
                newErrors[name] = !value || isNaN(value) ? 'Must be a number' : '';
                break;
            default:
                break;
        }
        setErrors(newErrors);
    };

    const isPrime = (num) => {
        for(let i = 2, s = Math.sqrt(num); i <= s; i++)
            if(num % i === 0) return false; 
        return num > 1;
    }

    const isPrimitiveRoot = (g, p) => {
        if (g <= 1 || g >= p) return false;
        
        // Find prime factors of p-1
        let factors = findPrimeFactors(p - 1);
        
        // Check if g^((p-1)/factor) mod p != 1 for all prime factors
        for (let factor of factors) {
            if (modPow(g, (p - 1) / factor, p) === 1) {
                return false;
            }
        }
        return true;
    }

    const findPrimeFactors = (n) => {
        let factors = new Set();
        for (let i = 2; i * i <= n; i++) {
            while (n % i === 0) {
                factors.add(i);
                n = Math.floor(n / i);
            }
        }
        if (n > 1) factors.add(n);
        return Array.from(factors);
    }

    const modPow = (base, power, mod) => {
        let result = 1;
        base %=  mod;
        while (power > 0) {
            if (power % 2 === 1) {
                result = (result * base) % mod;
            }
            power = Math.floor(power / 2);
            base = (base * base) % mod;
        }
        return result;
    }

    const generateAndPublishPublicKey = () => {
        const p = parseInt(alice.p);
        const g = parseInt(alice.g);
        const x = parseInt(alice.x);
        
        const h = modPow(g, x, p);
        
        setPublicKey({ p: p.toString(), g: g.toString(), h: h.toString() });
        setPublicKeyGenerated(true);

        setEncryptedMessage({ c1: '', c2: '' });
           setDecryptedMessage('');
           setMessageReceived(false);
           setErrors({});
    };

    const encryptAndSend = () => {
        setEncryptedMessage({ c1: '', c2: '' });
        setDecryptedMessage('');
        setMessageReceived(false);
        setErrors({});
        // Implement encryption logic here
        const { c1, c2 } = elGamalEncrypt(parseInt(bob.m), parseInt(publicKey.p), parseInt(publicKey.g), parseInt(publicKey.h), parseInt(bob.r));
        setEncryptedMessage({ c1, c2 });
        setMessageReceived(true);
    };

    const decrypt = () => {
        const decrypted = elGamalDecrypt(parseInt(alice.p), parseInt(alice.x),encryptedMessage.c1, encryptedMessage.c2);
        setDecryptedMessage(decrypted);
    };

    const generateRandomR = () => {
        const p = parseInt(publicKey.p);
        if (p) {
            const randomR = Math.floor(Math.random() * (p - 2)) + 2; // 2 <= r <= p-1
            setBob({ ...bob, r: randomR.toString() });
            validateField('r', randomR.toString());
        }
    };

    const hasAliceErrors = () => {
        return !!errors.p || !!errors.g || !!errors.x || !alice.p || !alice.g || !alice.x;
    };

    const hasBobErrors = () => {
        return !!errors.r || !!errors.m || !bob.r || !bob.m;
    };

    return (
        <Grow in={true} timeout={1000}>
            <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 4 }}>
                <Paper elevation={4} sx={{ padding: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                        ElGamal Cipher Tool
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Paper elevation={3} sx={{ width: '30%', padding: 2 }}>
                            <Typography variant="h6">Alice's Machine</Typography>
                            <TextField 
                                label="Enter a prime p" 
                                fullWidth 
                                name="p" 
                                value={alice.p} 
                                onChange={handleAliceChange} 
                                error={!!errors.p}
                                helperText={errors.p}
                                sx={{ mb: 2 }}
                            />
                            <TextField 
                                label="Choose g" 
                                fullWidth 
                                name="g" 
                                value={alice.g} 
                                onChange={handleAliceChange}
                                error={!!errors.g}
                                helperText={errors.g}
                                sx={{ mb: 2 }}
                            />
                            <TextField 
                                label="Enter Private Key x" 
                                fullWidth 
                                name="x" 
                                value={alice.x} 
                                onChange={handleAliceChange}
                                error={!!errors.x}
                                helperText={errors.x}
                                sx={{ mb: 2 }}
                            />
                            <Typography variant="body2" sx={{ mb: 2 }}>h is calculated as h = g^x mod p</Typography>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={generateAndPublishPublicKey} 
                                fullWidth 
                                sx={{ mb: 2, padding: '10px 0', fontSize: '16px' }}
                                disabled={hasAliceErrors()}
                            >
                                Generate & Publish Public Key
                            </Button>
                            
                            {messageReceived && (
                                <Box sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                                    <Typography>You received a message from Bob.</Typography>
                                    <Button 
                                        variant="contained" 
                                        color="success" 
                                        onClick={decrypt} 
                                        sx={{ mt: 1, padding: '10px 0', fontSize: '16px', width: '100%' }}
                                    >
                                        Decrypt
                                    </Button>
                                    {decryptedMessage && (
                                        <Typography sx={{ mt: 1 }}>Bob's decrypted message: {decryptedMessage}</Typography>
                                    )}
                                </Box>
                            )}
                        </Paper>

                        <Paper elevation={3} sx={{ width: '30%', padding: 2, alignSelf: 'center' }}>
                            <Typography variant="h6" align="center">Alice's Public Key</Typography>
                            <Typography align="center">{publicKey.p ? `p: ${publicKey.p}, g: ${publicKey.g}, h: ${publicKey.h}` : '--'}</Typography>
                            <Typography variant="h6" align="center" sx={{ mt: 2 }}>Bob's encrypted message</Typography>
                            <Typography align="center">{encryptedMessage.c1 ? `c1: ${encryptedMessage.c1}, c2: ${encryptedMessage.c2}` : '--'}</Typography>
                        </Paper>

                        <Paper elevation={3} sx={{ width: '30%', padding: 2 }}>
                            <Typography variant="h6">Bob's Machine</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <TextField 
                                    label="Private Key for Encryption r" 
                                    fullWidth 
                                    name="r" 
                                    value={bob.r} 
                                    onChange={handleBobChange}
                                    error={!!errors.r}
                                    helperText={errors.r}
                                    sx={{ mr: 1 }}
                                />
                                <Button 
                                    variant="outlined" 
                                    onClick={generateRandomR}
                                    disabled={!publicKeyGenerated}
                                    sx={{ minWidth: 'auto', px: 1 }}
                                >
                                    🎲
                                </Button>
                            </Box>
                            <TextField 
                                label="Message m" 
                                fullWidth 
                                name="m" 
                                value={bob.m} 
                                onChange={handleBobChange}
                                error={!!errors.m}
                                helperText={errors.m}
                                sx={{ mb: 2 }}
                            />
                            <Typography variant="body2" sx={{ mb: 2 }}>Encrypted message is calculated as (c1, c2) = (g^r mod p, (h^r * m) mod p)</Typography>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={encryptAndSend} 
                                fullWidth 
                                disabled={!publicKeyGenerated || hasBobErrors()}
                                sx={{ padding: '10px 0', fontSize: '16px' }}
                            >
                                Encrypt & Send
                            </Button>
                        </Paper>
                    </Box>
                </Paper>
            </Box>
        </Grow>
    );
}

export default ElGamalForm;