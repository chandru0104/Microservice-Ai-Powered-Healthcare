import mongoose from 'mongoose';

const user = new mongoose.Schema({
  name:{
    type:String
  },
  profile:{
    type:String
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
  },
  is_google_login:{
    type:Boolean,
    require:true
  },
  googleId:{
    type:String,
    require:true
  },
});

export const User = mongoose.model('user', user);
