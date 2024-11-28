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
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router
    .route("/")
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const resp = yield controllers_1.messageController.createMessage(req.body);
        return res.json({
            status: true,
            message: "message created successfully",
            newMessage: resp
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({
            status: false,
            message: `An error occured - ${(_a = error.message) !== null && _a !== void 0 ? _a : error}`,
        });
    }
}))
    .patch((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const resp = yield controllers_1.messageController.getMessages(req.body);
        return res.json({
            status: true,
            message: "Messages fethed successfully",
            messages: resp,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({
            status: false,
            message: `An error occured - ${(_a = error.message) !== null && _a !== void 0 ? _a : error}`,
        });
    }
}));
exports.default = router;
