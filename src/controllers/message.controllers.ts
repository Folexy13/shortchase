import { MessageModel } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class MessageController {
  constructor() {}

  public createMessage = async (input: any) => {
    try {
      if(!input.content || !input.sender ||!input.reciever){
        throw "Invalid parameter"
      }
      const isMessageExist: any = await MessageModel.findOne({sender:input.senderId});
        let newMessage;
        if (isMessageExist){
           newMessage= await MessageModel.findOneAndUpdate(
              { sender: input.senderId },
              { $push: { content: input } }
            )
              .populate("sender")
              .populate("reciever");
        }
        newMessage = await MessageModel.create(input)
      return newMessage;
    } catch (error) {
      throw error;
    }
  };

  public getMessages = async (input:any) => {
    try {
      const messages: any = await MessageModel.find({$or:[{reciever:input.reciever,sender:input.sender}]})
        .populate("sender")
        .populate("reciever");
      return messages;
    } catch (error) {
      throw error;
    }
  };
}

const messageController = new MessageController();

export default messageController;
