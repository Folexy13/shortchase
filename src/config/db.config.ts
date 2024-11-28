import mongoose from 'mongoose';



export async  function connectDB() {
 try {
    await mongoose.connect('mongodb://localhost:27017/dummy')
    console.log("DB connected succefully")
 } catch (error) {
    throw(error)
 }
}