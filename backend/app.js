import express from "express";
import cors from "cors";
import authRoutes from './src/routes/auth.routes.js'
import generatorRoutes from './src/routes/generator.routes.js'
import dataFetchRouter from './src/routes/datafetch.routes.js'
import publishRoutes from './src/routes/publish.routes.js'
import userRoutes from './src/routes/user.routes.js'
import stripeRoutes from './src/routes/stripe.routes.js'
import webHook from './src/routes/webhook.routes.js'
import { connectToMongoDB } from "./src/services/mongoDbServices.js";
import dotenv from 'dotenv'
import path from "path"
import cookieParser from 'cookie-parser';
const __dirname = path.resolve()

const app = express()

app.use(cookieParser());
dotenv.config()
app.use('/api/webhook',webHook)
app.use(express.json())

app.use(cors({
    origin: 'https://7f85-2409-40c2-1009-198-a894-2816-622a-c5f8.ngrok-free.app',
    credentials: true
}));




app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  next();
});





app.use('/api/auth',authRoutes)
app.use('/api/generator',generatorRoutes)
app.use('/api/retrive',dataFetchRouter)
app.use('/api/publish',publishRoutes)
app.use('/api/user',userRoutes)
app.use('/api/stripe',stripeRoutes)


app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))});

const port = 5000

app.listen(port,async()=>{
    await connectToMongoDB();
    console.log('Server is running on port',port)
})
