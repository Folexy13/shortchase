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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    constructor() {
        this.createUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { password, email, phone, username } = input;
            try {
                const isUserExist = yield models_1.UserModel.findOne({
                    $or: [{ email }, { phone }],
                });
                if (isUserExist && !isUserExist.occupation) {
                    throw "A user with this credential already existed";
                }
                if (!isUserExist && (!phone || !email)) {
                    throw "Either phone or email must be submitted";
                }
                if (password) {
                    const salt = bcrypt_1.default.genSaltSync(10);
                    const hashedPwd = yield bcrypt_1.default.hash(password, salt);
                    const newUser = yield models_1.UserModel.create(Object.assign(Object.assign({}, input), { password: hashedPwd }));
                    return newUser;
                }
                const newUser = yield models_1.UserModel.create(input);
                return newUser;
            }
            catch (error) {
                throw error;
            }
        });
        this.loginUser = (input) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { password, email, phone, username } = input;
            try {
                const isUserExist = yield models_1.UserModel.findOne({
                    $or: [{ email }, { phone }, { username }],
                });
                const isValidPwd = bcrypt_1.default.compare(password, isUserExist.password);
                if (!isValidPwd || !isUserExist) {
                    throw "Invalid Credentials Provided";
                }
                const payload = {
                    id: isUserExist._id,
                    accountType: isUserExist.accountType,
                };
                const token = jsonwebtoken_1.default.sign(payload, (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : "loremipsum", {
                    expiresIn: "4hr",
                    issuer: "https://shortchase.com",
                });
                return token;
            }
            catch (error) {
                throw error;
            }
        });
        this.updateUser = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, password } = input;
            try {
                const isUserExist = yield models_1.UserModel.findById(id);
                if (!isUserExist) {
                    throw "Oops- User not found!!";
                }
                if (password) {
                    //in real-life scenario, this would require a top-tier security and not through update route
                    const salt = bcrypt_1.default.genSaltSync(10);
                    const hashedPwd = yield bcrypt_1.default.hash(password, salt);
                    const updatedUser = yield models_1.UserModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, input), { password: hashedPwd }), { new: true, });
                    return updatedUser;
                }
                else {
                    const updatedUser = yield models_1.UserModel.findByIdAndUpdate(id, Object.assign({}, input), { new: true, });
                    return updatedUser;
                }
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findById(id);
                if (!user) {
                    throw "user does not exist in our system";
                }
                yield models_1.UserModel.deleteOne({ _id: id });
            }
            catch (error) {
                throw error;
            }
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserModel.findById(id);
                if (!user) {
                    throw "user does not exist in our system";
                }
                return user;
            }
            catch (error) {
                throw error;
            }
        });
        this.getAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.UserModel.find();
                return users;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
