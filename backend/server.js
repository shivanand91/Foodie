import express from 'express'
import cors from 'cors'
import  connectDB  from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import authRouter from './routes/authRoute.js';
import 'dotenv/config';

import dotenv from 'dotenv';
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;


// middleware
app.use(express.json());
app.use(cors());

// db connection
await connectDB()
.then(() => {
    console.log("db connected");
    app.listen(port, ()=>{
        console.log(`server started on port ${port}`);
    });
})
.catch((err) => {
    console.log("db connection error:", err);
    process.exit(1);
})

// api endpoints
app.use("/api/food",foodRouter);
app.use("/images", express.static('uploads')); // Serve images from the 'uploads' directory
app.use("/api/auth", authRouter);

app.get('/',(req,res)=>{
    res.send("api working");
});
