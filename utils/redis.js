const redis = require('redis');

// redis client class
class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  // Method to check if the connection to Redis is alive
  isAlive() {
    return this.client.ping() === 'PONG';
  }

  // Method to get a value from Redis based on a key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  // Method to set a value in Redis with a key and optional expiration
  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Method to delete a value from Redis based on a key
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
