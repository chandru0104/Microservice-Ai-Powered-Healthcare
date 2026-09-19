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
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  is_google_login:{
    type:Boolean,
    required:true,
    default:false
  },
  google_id:{
    type:String,
    required:true
  },
});

export const User = mongoose.model('user', user);


const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialties: {
        type: String,
    },
    role: {
        type: String,
        default: "doctor"
    },
    experience: {
        type: String,
    },
    place: {
        type: String,
    },
    price: {
        type: Number,
    },
    email: {
        type: String,
        unique: true
    },
    register: {
        type: String,
    },
    is_approved: {
        type: Boolean,
        default: false
    },
    profile: {
        type: String,
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_verify: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
    },
    status: {
        type: Number,
        default: 1
    },
    is_google_login: {
        type: Boolean,
        default: false
    },
    google_id: {
        type: String,
    },
}, { timestamps: true, versionKey: false })


export const Doctor = mongoose.model("Doctors", doctorSchema)



const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "admin"
  },
  permissions: {
    type: [String],
    default: []
  }
}, { 
  timestamps: true
});

export const Admin = mongoose.model('Admin', AdminSchema);

