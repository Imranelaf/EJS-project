const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create the schema of the database
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],//you can add your own error message
        unique: true,// you can't add the error message on some field like 'unique' for exemple
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Minimum length is 6 characters']
    }
});

// Static method for login
userSchema.statics.login = async function(email, password) {
    //check if the email exist in data usinf findOne mongoose function 
    const user = await this.findOne({ email });
    if (user) {
        // if the user exist we gonna check the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return user;
        }
        throw Error("Incorrect password");
    }
    throw Error("Incorrect email");
}

const User = mongoose.model("User", userSchema);

module.exports = User;
