import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, 
  accountType: {require:true,type:String},
  company: String,
  username:{type:String},
  occupation:String,
  password:String,
  email: {unique:true,type:String},
  phone: {unique:true,type:String},
  
  dob: { type: Date, default: Date.now },
},{timestamps:true});

const userCollection = mongoose.model("User",userSchema)
export default userCollection