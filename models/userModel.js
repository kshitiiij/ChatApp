const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// trim : true removes the white space from both sides to avoid ambiguity;

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        required : true
    },
    hash_password : {
        type : String,
    },
    created : {
        type : Date,
        default : Date.now,
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.hash_password);
};


mongoose.model('users',userSchema);