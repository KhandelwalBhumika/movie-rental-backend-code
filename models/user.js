const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const options = {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: 'modifiedAt',
    },
  };

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
     email:   {
        type: String,
        unique: true,
        required: [true, 'Please provide your email'],
      },

    password: {
        type: String,
        // required: true
        
    },
    contactNumber: {
        type: String,
        // required: true
    },
    role:{
      type: String,
      default: "user",
      enum: ["user", "admin"],//String
      lowercase: true,
      trim: true
    }, 
        balance:{
      type: Number,
      default: 500
    },
    
}, options )


module.exports = mongoose.model('User', userSchema)