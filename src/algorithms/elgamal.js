function modpow(base, pow, mod) {
    let result = 1;
    base %= mod;
    while (pow> 0) {
        if (pow % 2 === 1) {
            result = (result * base) % mod;
        }
        pow = Math.floor(pow / 2);
        base = (base * base) % mod;
    }
    return result;
}

function modInverse(a, m) {

    let A = Math.max(m,a);
    let B = Math.min(m,a);
    let q = Math.floor(A / B);
    let R = A % B;
    let T1= 0;
    let T2 = 1;
    let T = T1 - ( T2 * q);

    while (R !== 0){
        A = B;
        B = R;
        q = Math.floor(A / B);
        R = A % B;
        T1 = T2;
        T2 = T;
        T = T1 - ( T2 * q);
    }

    if (T2 < 0)
        return ((T2 / m)+1) * m  ;
    else
        return T2;
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