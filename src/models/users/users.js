const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Responses = require('../../utils/Responses');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        lowercase:true,
        trim:true,
        required:true,
        unique:true
    },
    first_name:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    last_name:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    married:{
        type:Boolean,
        required:true
    },
    kids:{
        type:Boolean,
        required:true
    },
    password:{
        type:String,
        lowercase:true,
        trim:true,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
});

userSchema.pre('save', async function (next) {
    const user = this;

    //
    if(user.isModified('password') || user.isNew){

        user.password = await bcrypt.hash(user.password, 8);

    }else {
        return next()
    }

});

userSchema.statics.findUserByCredentials = async(email, password)=>{
    const user = await Users.findOne({email});

    if (!user){
        throw new Error('Email not correct')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        throw new Error('Passwords do not match')
    }


    return user;
};

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, Responses.jwtSecretKey);

    user.tokens = user.tokens.concat({token});
    await user.save();
    return token
};

const Users = mongoose.model('Users', userSchema);
module.exports = Users;