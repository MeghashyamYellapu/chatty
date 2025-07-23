import express from "express";
import authroutes from "./src/routes/auth.routes.js"
import messageroute from "./src/routes/message.route.js"

import dotenv from "dotenv"
import { connectDB } from "./src/lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import { app,server } from "./src/lib/socket.js";
import path from "path";

dotenv.config()
// const app = express(); after socket.io


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
const port = process.env.PORT

const __dirname = path.resolve();
// app.use(express.json())
app.use(express.json({ limit: '10mb' })); // or more if needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser())

app.use("/api/auth",authroutes)
app.use("/api/messages",messageroute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"./frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"./frontend/dist/index.html"))
    })
}

server.listen(port,()=>{
    console.log(`server is running in port ${port}`)
    connectDB()
})