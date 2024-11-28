import express,{Application} from "express"
import cors from "cors"
import { messageRouter, userRouter } from "./routes"
import { connectDB } from "./config/db.config"
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import * as dotenv from "dotenv"
dotenv.config()
//Server Setup
const app:Application = express()
const port:string = process.env.PORT??"8002"


//dbconnection
connectDB(process.env.DB_URI??"mongodb://localhost:27017/dummy")

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/users",userRouter)
app.use("/api/v1/messages",messageRouter)

//server static/build file
const buildPath= path.join(__dirname,"../client/dist")
app.use(express.static(buildPath))

app.get("*",(req,res)=>{
  res.sendFile(path.join(buildPath,"index.html"))
})


//socket communication setup
const httpServer = createServer(app);
const io = new Server(httpServer, {
    // options
  });
  
  io.on("connection", (socket) => {
    console.log("Socket server is up and listening :0:0:0")
  });

//Server listener
httpServer.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})