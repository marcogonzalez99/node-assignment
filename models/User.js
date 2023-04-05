const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema for the user object, based off the Object in the MongoDB
const userSchema = new mongoose.Schema({
    id: Number,
    details: {
        firstname: String,
        lastname: String,
        city: String,
        country: String
    },
    picture: {
        large: String,
        thumbnail: String
    },
    membership: {
        date_joined: String,
        "last-update": String,
        likes: Number
    },
    email: String,
    password_bcrypt: String,
    apikey: String,
    favorites: Array
});

userSchema.methods.isValidPassword = async function(formPassword) {
    const user = this;
    const hash = user.password_bcrypt;
    // Hashes the password sent by the user for login and runs a check to determine
    // if the digest stored in the database matches the one sent. Returns true
    // if it does, returns false if it does not.
    const compare = await bcrypt.compare(formPassword, hash);
    return compare;
}

// Grabbing the 'Users' database for this schema
module.exports = mongoose.model('User', userSchema, 'Users');