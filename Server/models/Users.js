const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema({
  Phone:{
    type:Number,
    required:true
  },

  Email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

  pan:{
    type:String,
    required:true
  }
});
module.exports = mongoose.model('Users', UsersSchema);