const { Redis } = require("ioredis");

const redisClient = Redis.createClient(process.env.REDIS_URI)
// const redisClient = Redis.createClient({
//     username: process.env.REDIS_USERNAME,
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT
//     }
// })

export default redisClient

