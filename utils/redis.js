const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    const host = process.env.REDIS_HOST || 'localhost';
    const port = process.env.REDIS_PORT || 6379;

    this.client = redis.createClient({ host, port });
    this.client.on('error', (err) => {
      console.error('Redis client error:', err);
    });

    // Promisify Redis client methods
    this.pingAsync = promisify(this.client.ping).bind(this.client);
  }

  async isAlive() {
    try {
      await this.pingAsync();
      return true;
    } catch (err) {
      return false;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
