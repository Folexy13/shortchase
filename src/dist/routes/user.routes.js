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
router.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const resp = yield controllers_1.userController.loginUser(req.body);
        return res.json({
            status: true,
            message: "User logged in successfully",
            token: resp,
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
router
    .route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const users = yield controllers_1.userController.getAllUsers();
        return res.json({
            status: true,
            message: "Users fetched successfully",
            users,
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
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const resp = yield controllers_1.userController.createUser(req.body);
        return res.json({
            status: true,
            message: "User created successfully",
            user: resp,
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
router
    .route("/:id")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield controllers_1.userController.getUser(req.params.id);
        return res.json({
            status: true,
            message: "User fetched successfully",
            user,
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
    .post()
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    try {
        const resp = yield controllers_1.userController.updateUser(Object.assign(Object.assign({}, req.body), { id }));
        return res.json({
            status: true,
            message: "User Updated successfully",
            user: resp,
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
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        yield controllers_1.userController.deleteUser(req.params.id);
        return res.json({
            status: true,
            message: "Users deleted successfully",
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
