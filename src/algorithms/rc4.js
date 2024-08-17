function GenStateV(key) {
    let S = [];
    let T = [];

    for (let i = 0; i < 256; i++) {
        S[i] = i;
        T[i] = key.charCodeAt(i % key.length);
    }

    let j = 0;
    for (let i = 0; i < 256; i++) {
        j = (j + S[i] + T[i]) % 256;
        [S[i], S[j]] = [S[j], S[i]];
    }

    return S;
}

function Encryption(S, textLength) {
    let i = 0, j = 0;
    let keystream = [];

    for (let n = 0; n < textLength; n++) {
        i = (i + 1) % 256;
        j = (j + S[i]) % 256;

        [S[i], S[j]] = [S[j], S[i]];

        let t = S[(S[i] + S[j]) % 256];
        keystream.push(t);
    }

    return keystream;
}

export function rc4Encrypt(plaintext, key) {
    const S = GenStateV(key);
    const keystream = Encryption(S, plaintext.length);
    let ciphertext = '';

    for (let i = 0; i < plaintext.length; i++) {
        const ptByte = plaintext.charCodeAt(i);
        const keyByte = keystream[i];
        const ctByte = ptByte ^ keyByte;
        ciphertext += String.fromCharCode(ctByte);
    }

    return { ciphertext, keystream };
}

export function rc4Decrypt(ciphertext, key) {
    // RC4 decryption is symmetric, same function as encryption
    return rc4Encrypt(ciphertext, key);
}
