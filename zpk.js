class ZKPLoginSystem {
    constructor() {
        this.p = 23;
        this.g = 5;  
        this.userDatabase = {}; // Store usernames and public keys
    }

    // Helper function to compute modular exponentiation (base^exp % mod)
    modExp(base, exp, mod) {
        let result = 1;
        base = base % mod;
        while (exp > 0) {
            if (exp % 2 === 1) result = (result * base) % mod;
            exp = Math.floor(exp / 2);
            base = (base * base) % mod;
        }
        return result;
    }

    // User registers by providing a password, which is hashed to create a secret number
    register(username, password) {
        const x = parseInt(this.simpleHash(password), 16) % this.p; 
        const y = this.modExp(this.g, x, this.p); 
        this.userDatabase[username] = { y, x };
        console.log(`${username} registered with public key y = ${y}`);
    }

    // Simple hash function (SHA-256 imitation using char codes for example purposes)
    simpleHash(input) {
        return input.split('').reduce((hash, char) => {
            return ((hash << 5) - hash + char.charCodeAt(0)) & 0xffffffff;
        }, 0).toString(16);
    }

    // Start the login process: user generates a random number and calculates 'a'
    initiateLogin(username) {
        const user = this.userDatabase[username];
        if (!user) {
            console.log("User not registered");
            return;
        }
        
        const r = Math.floor(Math.random() * this.p);
        const a = this.modExp(this.g, r, this.p);
        user.r = r; // Store r for later use in challenge response
        user.a = a;

        console.log(`Challenge a = ${a} sent to ${username}`);
        return a;
    }

    // User responds to server's challenge
    respondToChallenge(username, challenge) {
        const user = this.userDatabase[username];
        if (!user || typeof user.r === 'undefined') {
            console.log("Invalid or expired challenge");
            return;
        }

        const z = (user.r + challenge * user.x) % (this.p - 1);
        delete user.r; // Clear r from memory for security
        console.log(`Response z = ${z} sent for verification`);
        return z;
    }

    // Server verifies the proof provided by the user
    verify(username, a, z, challenge) {
        const user = this.userDatabase[username];
        if (!user) {
            console.log("User not found");
            return false;
        }

        const left = this.modExp(this.g, z, this.p);
        const right = (a * this.modExp(user.y, challenge, this.p)) % this.p;

        const verified = left === right;
        console.log(`Verification ${verified ? "successful" : "failed"}`);
        return verified;
    }
}

// Example Usage
const loginSystem = new ZKPLoginSystem();

// Register a user
loginSystem.register('alice', 'securepassword123');

// User attempts to log in
const username = 'alice';

// Step 1: Server initiates a challenge with 'a'
const a = loginSystem.initiateLogin(username);

// Step 2: Server generates a random challenge
const challenge = Math.floor(Math.random() * loginSystem.p);
console.log(`Server sends challenge = ${challenge}`);

// Step 3: User responds to the challenge
const z = loginSystem.respondToChallenge(username, challenge);

// Step 4: Server verifies the response
const result = loginSystem.verify(username, a, z, challenge);
console.log(`Login ${result ? "successful" : "failed"}`);
