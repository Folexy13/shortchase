"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = exports.UserModel = void 0;
var user_models_1 = require("./user.models");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return __importDefault(user_models_1).default; } });
var message_models_1 = require("./message.models");
Object.defineProperty(exports, "MessageModel", { enumerable: true, get: function () { return __importDefault(message_models_1).default; } });
