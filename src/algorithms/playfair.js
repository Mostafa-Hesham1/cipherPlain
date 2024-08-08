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
