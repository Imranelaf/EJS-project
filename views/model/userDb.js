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
        //you can add your own error message
        required: [true, "please enter an email"],
        // you can't add the error message on some field like 'unique' for exemple
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6 , 'minimum length is 6 caracters']
    }
});

// check login process

//creating a statics function of login inside user
userSchema.statics.login = async function(email, password) {
    //check if the email exist in data usinf findOne mongoose function 
    const user = await this.findOne({email});
    if (user){
        // if the user exist we gonna check the password
        const isMatch = await bcrypt.compare(password, user.password );
        if(isMatch){
            return user;// if email and password match
        }throw Error("Incorrect password"); //hundle errors

    }throw Error("Incorrect Email");

}

const User = mongoose.model("User", userSchema);

module.exports = User;
