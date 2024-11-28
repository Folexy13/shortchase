import mongoose from 'mongoose';



export async  function connectDB(uri:string) {
 try {
    await mongoose.connect(uri)
    console.log("DB connected succefully")
 } catch (error) {
    throw(error)
 }
}