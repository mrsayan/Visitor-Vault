import redis from "redis";
import dotenv from "dotenv";

dotenv.config({ path: "./config/config.env" });

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

const connectDB = async () => {
  try {
  await redisClient.connect();
  console.log(`Redis connected`);
  return redisClient;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { redisClient, connectDB };