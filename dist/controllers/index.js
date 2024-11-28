"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageController = exports.userController = void 0;
var user_controllers_1 = require("./user.controllers");
Object.defineProperty(exports, "userController", { enumerable: true, get: function () { return __importDefault(user_controllers_1).default; } });
var message_controllers_1 = require("./message.controllers");
Object.defineProperty(exports, "messageController", { enumerable: true, get: function () { return __importDefault(message_controllers_1).default; } });
