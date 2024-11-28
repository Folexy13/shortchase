"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class MessageController {
    constructor() {
        this.createMessage = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.content || !input.sender || !input.reciever) {
                    throw "Invalid parameter";
                }
                const isMessageExist = yield models_1.MessageModel.findOne({ sender: input.senderId });
                let newMessage;
                if (isMessageExist) {
                    newMessage = yield models_1.MessageModel.findOneAndUpdate({ sender: input.senderId }, { $push: { content: input } })
                        .populate("sender")
                        .populate("reciever");
                }
                newMessage = yield models_1.MessageModel.create(input);
                return newMessage;
            }
            catch (error) {
                throw error;
            }
        });
        this.getMessages = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield models_1.MessageModel.find({ $or: [{ reciever: input.reciever, sender: input.sender }] })
                    .populate("sender")
                    .populate("reciever");
                return messages;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const messageController = new MessageController();
exports.default = messageController;
