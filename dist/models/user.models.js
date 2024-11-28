"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
    name: String,
    accountType: { require: true, type: String },
    company: String,
    username: { type: String },
    occupation: String,
    password: String,
    email: { unique: true, type: String },
    phone: { unique: true, type: String },
    dob: { type: Date, default: Date.now },
}, { timestamps: true });
const userCollection = mongoose_1.default.model("User", userSchema);
exports.default = userCollection;
