const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema( {
    name : {type : String, required: true},
    email : {type: String, required: true, unique: true},
    password: {type: String, required: true},
    favorites:{type:[String], required: false},
    token: { type: String, required: false },
    profilePicture : {type: String, required: false},
    
},
{
    timestamps: true, 
    versionKey: false
})


userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    try {
        const salt = await bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        console.log("error hashing password",error);
        next(error);
    }
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compareSync(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports= User;