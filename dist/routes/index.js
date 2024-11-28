"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = exports.userRouter = void 0;
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return __importDefault(user_routes_1).default; } });
var message_routes_1 = require("./message.routes");
Object.defineProperty(exports, "messageRouter", { enumerable: true, get: function () { return __importDefault(message_routes_1).default; } });
