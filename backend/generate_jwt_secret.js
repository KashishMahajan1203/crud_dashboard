const fs = require('fs');
const crypto = require('crypto');

// Generate a secure random JWT secret
const jwtSecret = crypto.randomBytes(64).toString('hex');

// Read current .env file
let envContent = '';
try {
  envContent = fs.readFileSync('.env', 'utf8');
} catch (err) {
  // If .env doesn't exist, create basic content
  envContent = 'MONGO_URI=mongodb://localhost:27017/mern-crud\nPORT=5000\n';
}

// Update or add JWT_SECRET
const lines = envContent.split('\n');
let jwtSecretFound = false;
const updatedLines = lines.map(line => {
  if (line.startsWith('JWT_SECRET=')) {
    jwtSecretFound = true;
    return `JWT_SECRET=${jwtSecret}`;
  }
  return line;
});

if (!jwtSecretFound) {
  updatedLines.push(`JWT_SECRET=${jwtSecret}`);
}

// Write back to .env
fs.writeFileSync('.env', updatedLines.join('\n'));

console.log('New JWT secret generated and saved to .env file');
console.log('JWT_SECRET:', jwtSecret);
