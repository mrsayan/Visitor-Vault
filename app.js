// Import required libraries
import express from "express";
import { redisClient } from "./config/redis.js";

// Create an instance of our router
const router = express.Router();

// Define a route to increment the page views count
router.get("/views", async (req, res) => {
  try {
    // Get the client IP address
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Check if the IP address has already incremented the count
    const exists = await redisClient.sIsMember("ips", ip);
    // set expire time 2 hours
    await redisClient.expire("ips", 7200);

    // If the IP address hasn't incremented the count yet, increment it and add the IP to the set
    if (!exists) {
      await redisClient.incr("views");
      await redisClient.sAdd("ips", ip);
    }

    // Get the current total views count
    const totalViews = await redisClient.get("views");

    // Return the total views count as a JSON response
    res.json({ totalViews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
