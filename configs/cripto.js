const crypto = require('crypto');

function ecryptedIdUser(idUser, secretKey){
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(idUser.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decryptUserId(encryptedUserId, secretKey) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decrypted = decipher.update(encryptedUserId, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { ecryptedIdUser, decryptUserId}