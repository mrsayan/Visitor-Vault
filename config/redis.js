import redis from "redis";

const redisClient = redis.createClient(process.env.REDIS_URL)

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