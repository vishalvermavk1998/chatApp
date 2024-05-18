import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToMongo from './DB/connect.mongoDB.js';

import authRoutes from './Routes/auth.routes.js'; // Move this import to the top
import messageRoutes from "./Routes/message.route.js"
import userRoutes from "./Routes/users.route.js"
import { app, server } from './socket/socket.js';




dotenv.config();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);



server.listen(port, () => {
    connectToMongo();
    console.log("App is running on port", port);
});
