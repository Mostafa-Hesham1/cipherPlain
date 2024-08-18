class AES {
    constructor(key) {
        this.sBox = [
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

        this.invSBox = [
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

        this.rCon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
        this.key = key;
        this.roundKeys = this.keyExpansion(key);
    }

    subBytes(state, sBox) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                state[i][j] = sBox[state[i][j]];
            }
        }
    }

    shiftRows(state) {
        for (let i = 1; i < 4; i++) {
            // performing a circular left shift on each row by i positions
            // state[1] = [1, 2, 3, 4]
            // state[1].slice(1) = [2, 3, 4]
            // state[1].slice(0, 1) = [1]
            // state[1] = [2, 3, 4, 1]
            state[i] = state[i].slice(i).concat(state[i].slice(0, i));
        }
    }
    
    invShiftRows(state) {
        for (let i = 1; i < 4; i++) {
            // performing a circular right shift on each row by i positions
            // state[1] = [1, 2, 3, 4]
            // state[1].slice(-i) = [4]
            // state[1].slice(0, -i) = [1, 2, 3]
            // state[1] = [4, 1, 2, 3]
            state[i] = state[i].slice(-i).concat(state[i].slice(0, -i));
        }
    }

    mixColumns(state) {
        // masking with 0xFF to ensure the result is a byte
        // xoring with 0x1B if the most significant bit is ON to avoid overflow
        const mul2 = (x) => ((x << 1) & 0xFF) ^ (x & (1 << 7) ? 0x1B : 0);
        const mul3 = (x) => mul2(x) ^ x;
    
        let newState = [];
    
        for (let c = 0; c < 4; c++) { // Process each column
            newState[c] = [
                mul2(state[0][c]) ^ mul3(state[1][c]) ^ state[2][c] ^ state[3][c],
                state[0][c] ^ mul2(state[1][c]) ^ mul3(state[2][c]) ^ state[3][c],
                state[0][c] ^ state[1][c] ^ mul2(state[2][c]) ^ mul3(state[3][c]),
                mul3(state[0][c]) ^ state[1][c] ^ state[2][c] ^ mul2(state[3][c])
            ];
        }
    
        return newState;
    }

    invMixColumns(state) {
        const mul2 = (x) => ((x << 1) & 0xFF) ^ (x & (1 << 7) ? 0x1B : 0);
        const mul9 = (x) => mul2(mul2(mul2(x))) ^ x;
        const mul11 = (x) => mul2(mul2(mul2(x)) ^ x) ^ x;
        const mul13 = (x) => mul2(mul2(mul2(x) ^ x)) ^ x;
        const mul14 = (x) => mul2(mul2(mul2(x) ^ x) ^ x);
    
        let newState = [];
    
        for (let c = 0; c < 4; c++) {
            newState[c] = [
                mul14(state[0][c]) ^ mul11(state[1][c]) ^ mul13(state[2][c]) ^ mul9(state[3][c]),
                mul9(state[0][c]) ^ mul14(state[1][c]) ^ mul11(state[2][c]) ^ mul13(state[3][c]),
                mul13(state[0][c]) ^ mul9(state[1][c]) ^ mul14(state[2][c]) ^ mul11(state[3][c]),
                mul11(state[0][c]) ^ mul13(state[1][c]) ^ mul9(state[2][c]) ^ mul14(state[3][c])
            ];
        }
    
        return newState;
    }

    addRoundKey(state, roundKey) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                // accessing the round key in column-wise order
                state[i][j] ^= roundKey[i + 4 * j];
            }
        }
    }

    keyExpansion(key) {
        const keyWords = [];
        const expandedKeys = [];

        // extracting the first 4 words
        for (let i = 0; i < 4; i++) {
            keyWords[i] = key.slice(4 * i, 4 * i + 4);
        }

        // Generate the remaining round keys
        for (let i = 4; i < 44; i++) {
            let temp = [...keyWords[i - 1]];
            if (i % 4 === 0) {
                temp = this.keyExpansionCore(temp, i / 4);
            }
            keyWords[i] = this.xorWords(keyWords[i - 4], temp);
        }

        // Flatten keyWords into expandedKeys array
        for (let i = 0; i < 44; i++) {
            expandedKeys.push(...keyWords[i]);
        }

        console.log(expandedKeys.map(byte => byte.toString(16).padStart(2, '0')).join(' '));

        return expandedKeys;
    }

    keyExpansionCore(word, iteration) {
        // Rot nibble, like pop_front and push_back
        word.push(word.shift());

        // Sub nibble
        for (let i = 0; i < 4; i++) {
            word[i] = this.sBox[word[i]];
        }
        console.log(word[0].toString(16).padStart(2, '0'));

        // XOR the first byte with the round constant
        word[0] ^= this.rCon[iteration - 1];

        return word;
    }

    xorWords(word1, word2) {
        return word1.map((byte, index) => byte ^ word2[index]);
    }

    encrypt(plaintext) {

        let state = this.createStateMatrix(plaintext);
        console.log(state.map(row => row.map(byte => byte.toString(16).padStart(2, '0')).join(' ')));
        
        this.addRoundKey(state, this.roundKeys.slice(0, 16));
        
        for (let round = 1; round < 10; round++) {
            this.subBytes(state, this.sBox);
            this.shiftRows(state);
            this.mixColumns(state);
            this.addRoundKey(state, this.roundKeys.slice(round * 16, (round + 1) * 16));
            console.log(state.map(row => row.map(byte => byte.toString(16).padStart(2, '0')).join(' ')));
        }
        
        this.subBytes(state, this.sBox);
        this.shiftRows(state);
        this.addRoundKey(state, this.roundKeys.slice(160));

        return this.stateToCipherText(state);
    }

    stateToCipherText(state) {
        // Convert the state matrix to column-wise order
        const cipherText = [];
        for (let col = 0; col < 4; col++) {
            for (let row = 0; row < 4; row++) {
                cipherText.push(state[row][col]);
            }
        }
        return cipherText;
    }

    cipherTextToState(cipherText) {
        const state = [];
        for (let row = 0; row < 4; row++) {
            state[row] = [];
            for (let col = 0; col < 4; col++) {
                state[row][col] = cipherText[col * 4 + row];
            }
        }
        return state;
    }

    decrypt(ciphertext) {
        let state = this.cipherTextToState(ciphertext);
        console.log(state.map(row => row.map(byte => byte.toString(16).padStart(2, '0')).join(' ')));
        
        // Reverse the encryption process

        // Round 10
        this.addRoundKey(state, this.roundKeys.slice(160));  
        
        // Rounds 9 to 1
        for (let round = 9; round > 0; round--) {
            this.invShiftRows(state);
            this.subBytes(state, this.invSBox);
            this.addRoundKey(state, this.roundKeys.slice(round * 16, (round + 1) * 16));
            this.invMixColumns(state);
        }
        
        // Round 0
        this.invShiftRows(state);
        this.subBytes(state, this.invSBox);
        this.addRoundKey(state, this.roundKeys.slice(0, 16));  
    
        return this.stateToCipherText(state);
    }
    
    createStateMatrix(input) {
        let state = [];
        for (let i = 0; i < 4; i++) {
            state[i] = [];
            for (let j = 0; j < 4; j++) {
                state[i][j] = input[i + 4 * j];
            }
        }
        return state;
    }
}

export default AES;