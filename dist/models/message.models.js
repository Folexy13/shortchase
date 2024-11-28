"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const messageSchema = new Schema({
    sender: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    reciever: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    content: Schema.Types.Mixed,
}, { timestamps: true });
const MessageCollection = mongoose_1.default.model("Message", messageSchema);
exports.default = MessageCollection;
