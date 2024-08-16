function modpow(base, power, mod) {
    let result = 1;
    base %= mod;
    while (power > 0) {
        if (power % 2 === 1) {
            result = (result * base) % mod;
        }
        power = Math.floor(power / 2);
        base = (base * base) % mod;
    }
    return result;
}

function modInverse(a, m) {
    // Ensure a is positive and within the range [0, m-1]
    a %= m;
    if (a < 0) 
        a += m;

    const m0 = m;
    let x0 = 0, x1 = 1;

    if (m === 1) {
        return 0; 
    }

    while (a > 1) {
        let q = Math.floor(a / m);

        // Update m and a
        let temp = m;
        m = a % m;
        a = temp;

        // Update x0 and x1
        temp = x0;
        x0 = x1 - q * x0;
        x1 = temp;
    }

    if (x1 < 0) {
        x1 += m0;
    }

    return x1;
}


//Step 3 of ElGamal Encryption
export function elGamalEncrypt(plaintext, p, g ,h , k) {
    //Calcualte K = y^k mod p
    const K = modpow(h, k, p); 
    //Calculate c1 = g * k mod p
    const c1 = modpow(g, k, p); 
    //Calculate c2 = m * K mod p
    const c2 = (Number(plaintext) * K) % p;

    return { c1, c2 }; // Return ciphertext as an object
}


export function elGamalDecrypt(p, x,c1,c2) {
    const newK = modpow(c1,x,p); 
    const KInverse = modInverse(newK, p); // K^-1 mod p
    const m = c2 * KInverse % p;

    return m.toString(); // Return decrypted plaintext
}