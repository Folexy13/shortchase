"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const db_config_1 = require("./config/db.config");
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
//Server Setup
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "8002";
//dbconnection
(0, db_config_1.connectDB)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1/users", routes_1.userRouter);
app.use("/api/v1/messages", routes_1.messageRouter);
//server static/build file
const buildPath = path_1.default.join(__dirname, "../client/dist");
app.use(express_1.default.static(buildPath));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(buildPath, "index.html"));
});
//socket communication setup
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
// options
});
io.on("connection", (socket) => {
    console.log("Socket server is up and listening :0:0:0");
});
//Server listener
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
