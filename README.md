# CipherPlain

## Project Overview

CipherPlain is a web-based application that allows users to encrypt and decrypt text using various algorithms, including Playfair Cipher, AES, ElGamal, and RC4. The project is built using React and Material-UI, and it provides a user-friendly interface for working with these cryptographic algorithms.

## Features

- **Playfair Cipher**: Encrypt and decrypt text using the Playfair Cipher algorithm.
- **AES (Advanced Encryption Standard)**: Securely encrypt and decrypt data using AES.
- **ElGamal**: Use the ElGamal encryption algorithm for secure communication.
- **RC4**: Encrypt and decrypt data using the RC4 stream cipher.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Mostafa-Hesham1/cipherPlain.git
   cd cipherPlain
2. **Install dependencies**
      ```bash
        npm install
3. **Set Environment Variable (for OpenSSL issues)**
   --**On Windows**
      ```bash
        set N ODE_OPTIONS=--openssl-legacy-provider
**On Windows**
   ```bash
 export NODE_OPTIONS=--openssl-legacy-provider
```

4.**Run the development server**
  ```bash
       npm start





