import 'dotenv/config'

import express from "express";
import db from "./db/db.config.js";
import cors from "cors"
import mainRouter from "./src/api/main.routes.js";
import {errorHandler} from "./src/middleware/errorHandler.js";

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}))
// /api
app.use('/api', mainRouter);

app.use(errorHandler);
async function startServer(){
    try{
        const connection = await db.getConnection();
        connection.release();
        const port = process.env.PORT || 3788;
        app.listen(port,err => {
            if(err){
                throw err;
            } 
            console.log(`server is running on port ${port}`);
        });
    }
    catch(err){
        console.error('error starting server:', err);
        process.exitCode = 1;
    }
}

startServer();
// Developed by: [Natnael Tsegaye]
// clone of ChatGPT using OpenAI API and React.js 