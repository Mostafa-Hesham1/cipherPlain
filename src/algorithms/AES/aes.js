
import AES from './aes_class'; // Assuming the AES class is defined as shown previously

export function hexStringToByteArray(hexString) {
    const byteArray = [];
    for (let i = 0; i < hexString.length; i += 2) {
        byteArray.push(parseInt(hexString.substr(i, 2), 16));
    }
    return byteArray;
}

export function byteArrayToHexString(byteArray) {
    return byteArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export function encrypt(plaintextHex, keyHex) {
    const plaintextBytes = hexStringToByteArray(plaintextHex);
    const keyBytes = hexStringToByteArray(keyHex);

    const aes = new AES(keyBytes);
    const encryptedBytes = aes.encrypt(plaintextBytes);

    return byteArrayToHexString(encryptedBytes);
}

export function decrypt(ciphertextHex, keyHex) {
    const ciphertextBytes = hexStringToByteArray(ciphertextHex);
    const keyBytes = hexStringToByteArray(keyHex);

    const aes = new AES(keyBytes);
    const decryptedBytes = aes.decrypt(ciphertextBytes);

    return byteArrayToHexString(decryptedBytes);
}
