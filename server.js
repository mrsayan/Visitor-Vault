// Import required libraries
import express from "express";
import { connectDB } from "./config/redis.js";
import viewsRouter from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

// Create an instance of our app
const app = express();

// Connect to Redis database
connectDB();

// Use the views router for all requests to the root path
app.use("/", viewsRouter);

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
}
);