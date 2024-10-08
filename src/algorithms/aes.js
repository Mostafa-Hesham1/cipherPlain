
function createMatrix(key) {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // J treated as I
    let matrixString = "";
    let used = new Set();

    key = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');

    for (let char of key) {
        if (!used.has(char) && alphabet.includes(char)) {
            matrixString += char;
            used.add(char);
        }
    }

    for (let char of alphabet) {
        if (!used.has(char)) {
            matrixString += char;
            used.add(char);
        }
    }

    const matrix = [];
    for (let i = 0; i < 5; i++) {
        matrix.push(matrixString.slice(i * 5, i * 5 + 5).split(''));
    }

    return matrix;
}

function prepareText(text, substitute = 'X') {
    text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let pairs = [];

    for (let i = 0; i < text.length; i += 2) {
        let pair = text[i];

        // If the next character is the same, insert the substitute
        if (i + 1 < text.length) {
            if (text[i] === text[i + 1]) {
                pair += substitute;
                i--;  // Stay at the same index to process the next pair correctly
            } else {
                pair += text[i + 1];
            }
        } else {
            pair += substitute;  // Pad with 'X' if we reach the last character and it's alone
        }

        pairs.push(pair);
    }

    return pairs;
}

function findPosition(letter, matrix) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === letter) {
                return { row, col };
            }
        }
    }
    return null;
}

export function playfairEncrypt(text, key) {
    const matrix = createMatrix(key);
    const pairs = prepareText(text);
    let encryptedText = '';
    let steps = [
        '1- Construct a 5x5 matrix.',
        '2- Sort the key in the matrix and fill with remaining letters.',
        '3- Group plaintext into pairs: ' + pairs.join(', ')
    ];

    pairs.forEach(pair => {
        const pos1 = findPosition(pair[0], matrix);
        const pos2 = findPosition(pair[1], matrix);
        let result = '';

        if (pos1.row === pos2.row) {
            result = matrix[pos1.row][(pos1.col + 1) % 5] + matrix[pos2.row][(pos2.col + 1) % 5];
            steps.push(`Encrypt pair ${pair}: Same row, move right -> ${result}`);
        } else if (pos1.col === pos2.col) {
            result = matrix[(pos1.row + 1) % 5][pos1.col] + matrix[(pos2.row + 1) % 5][pos2.col];
            steps.push(`Encrypt pair ${pair}: Same column, move below -> ${result}`);
        } else {
            result = matrix[pos1.row][pos2.col] + matrix[pos2.row][pos1.col];
            steps.push(`Encrypt pair ${pair}: Different row and column, rectangle swap -> ${result}`);
        }
        encryptedText += result;
    });

    steps.push('4- Perform encryption using the following rules: Same row: move right, Same column: move below, Different row and column: rectangle swap.');
    return { encryptedText, matrix, steps };
}

export function playfairDecrypt(text, key) {
    const matrix = createMatrix(key);
    const pairs = prepareText(text);
    let decryptedText = '';
    let steps = [
        '1- Construct a 5x5 matrix.',
        '2- Sort the key in the matrix and fill with remaining letters.',
        '3- Group ciphertext into pairs: ' + pairs.join(', ')
    ];

    pairs.forEach(pair => {
        const pos1 = findPosition(pair[0], matrix);
        const pos2 = findPosition(pair[1], matrix);
        let result = '';

        if (pos1.row === pos2.row) {
            result = matrix[pos1.row][(pos1.col + 4) % 5] + matrix[pos2.row][(pos2.col + 4) % 5];
            steps.push(`Decrypt pair ${pair}: Same row, move left -> ${result}`);
        } else if (pos1.col === pos2.col) {
            result = matrix[(pos1.row + 4) % 5][pos1.col] + matrix[(pos2.row + 4) % 5][pos2.col];
            steps.push(`Decrypt pair ${pair}: Same column, move above -> ${result}`);
        } else {
            result = matrix[pos1.row][pos2.col] + matrix[pos2.row][pos1.col];
            steps.push(`Decrypt pair ${pair}: Different row and column, rectangle swap -> ${result}`);
        }
        decryptedText += result;
    });

    steps.push('4- Perform decryption using the following rules: Same row: move left, Same column: move above, Different row and column: rectangle swap.');
    return { decryptedText, matrix, steps };
}

// AES Constants
const AES_SBOX = [
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
    0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
    0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
    0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
    0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
    0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
    0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
    0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
    0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
    0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
];

const AES_INV_SBOX = [
    0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb,
    0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb,
    0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e,
    0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25,
    0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92,
    0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84,
    0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06,
    0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b,
    0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73,
    0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e,
    0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b,
    0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4,
    0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f,
    0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef,
    0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61,
    0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d
];

const AES_RCON = [
    0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1B, 0x36,
    0x6C, 0xD8, 0xAB, 0x4D, 0x9A, 0x2F, 0x5E, 0xBC, 0x63, 0xC6,
    0x97, 0x35, 0x6A, 0xD4, 0xB3, 0x7D, 0xFA, 0xEF, 0xC5, 0x91
];

// Helper Functions
function hexStringToByteArray(hexString) {
    return Array.from({ length: hexString.length / 2 }, (_, i) => parseInt(hexString.substr(i * 2, 2), 16));
}

function byteArrayToHexString(byteArray) {
    return byteArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function subWord(word) {
    return word.map(byte => AES_SBOX[byte]);
}

function rotWord(word) {
    return [word[1], word[2], word[3], word[0]];
}

function multiply(a, b) {
    let product = 0;
    for (let counter = 0; counter < 8; counter++) {
        if (b & 1) product ^= a;
        let hiBitSet = (a & 0x80);
        a <<= 1;
        if (hiBitSet) a ^= 0x1b; // x^8 + x^4 + x^3 + x + 1
        b >>= 1;
    }
    return product;
}

// Key Expansion
function keyExpansion(key) {
    const Nb = 4;
    const Nk = key.length / 4;
    const Nr = Nk + 6;
    let expandedKey = [];

    for (let i = 0; i < Nk; i++) {
        expandedKey.push(key.slice(i * 4, (i + 1) * 4));
    }

    for (let i = Nk; i < Nb * (Nr + 1); i++) {
        let temp = expandedKey[i - 1].slice();
        if (i % Nk === 0) {
            temp = subWord(rotWord(temp)).map((byte, idx) => byte ^ AES_RCON[Math.floor(i / Nk) - 1]);
        } else if (Nk > 6 && i % Nk === 4) {
            temp = subWord(temp);
        }
        expandedKey.push(temp.map((byte, idx) => byte ^ expandedKey[i - Nk][idx]));
    }

    return expandedKey;
}

// AddRoundKey
function addRoundKey(state, roundKey) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            state[row][col] ^= roundKey[col][row];  // Ensure roundKey is structured similarly
        }
    }
}

// SubBytes
function subBytes(state, inv = false) {
    const box = inv ? AES_INV_SBOX : AES_SBOX;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            state[row][col] = box[state[row][col]];
        }
    }
}

// ShiftRows
function shiftRows(state, inv = false) {
    for (let row = 1; row < 4; row++) {
        if (inv) {
            state[row] = state[row].slice(4 - row).concat(state[row].slice(0, 4 - row));
        } else {
            state[row] = state[row].slice(row).concat(state[row].slice(0, row));
        }
    }
}

// MixColumns
function mixColumns(state, inv = false) {
    const fixed = inv ? [0x0e, 0x0b, 0x0d, 0x09] : [0x02, 0x03, 0x01, 0x01];
    for (let col = 0; col < 4; col++) {
        const colVals = [0, 1, 2, 3].map(row => state[row][col]);
        for (let row = 0; row < 4; row++) {
            state[row][col] = fixed.reduce((acc, item, idx) => acc ^ multiply(colVals[(row + idx) % 4], item), 0);
        }
    }
}

// Encrypt
function encrypt(plaintext, key) {
    let state = [];
    let bytes = hexStringToByteArray(plaintext);
    for (let i = 0; i < 4; i++) {
        state.push(bytes.slice(i * 4, (i + 1) * 4));
    }

    let expandedKey = keyExpansion(hexStringToByteArray(key));
    addRoundKey(state, expandedKey.slice(0, 4));

    for (let round = 1; round < expandedKey.length / 4 - 1; round++) {
        subBytes(state);
        shiftRows(state);
        mixColumns(state);
        addRoundKey(state, expandedKey.slice(round * 4, (round + 1) * 4));
    }

    subBytes(state);
    shiftRows(state);
    addRoundKey(state, expandedKey.slice(expandedKey.length - 4));

    return byteArrayToHexString(state.flat());
}

// Decrypt
function decrypt(ciphertext, key) {
    let state = [];
    let bytes = hexStringToByteArray(ciphertext);
    for (let i = 0; i < 4; i++) {
        state.push(bytes.slice(i * 4, (i + 1) * 4));
    }

    let expandedKey = keyExpansion(hexStringToByteArray(key));
    addRoundKey(state, expandedKey.slice(expandedKey.length - 4));

    for (let round = expandedKey.length / 4 - 2; round > 0; round--) {
        shiftRows(state, true);
        subBytes(state, true);
        addRoundKey(state, expandedKey.slice(round * 4, (round + 1) * 4));
        mixColumns(state, true);
    }

    shiftRows(state, true);
    subBytes(state, true);
    addRoundKey(state, expandedKey.slice(0, 4));

    return byteArrayToHexString(state.flat());
}

// Export functions
export { encrypt, decrypt, hexStringToByteArray, byteArrayToHexString };
