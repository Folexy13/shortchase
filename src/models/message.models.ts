import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  sender: {type: mongoose.Types.ObjectId, ref: "User"}, 
  reciever: {type: mongoose.Types.ObjectId, ref: "User"},
  content: Schema.Types.Mixed,
},{timestamps:true});

const MessageCollection = mongoose.model("Message",messageSchema)
export default MessageCollection