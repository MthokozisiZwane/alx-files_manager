const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AppController {
  async getStatus(req, res) {
    const redisAlive = await redisClient.isAlive();
    const dbAlive = await dbClient.isAlive();
    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  async getStats(req, res) {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    res.status(200).json({ users: usersCount, files: filesCount });
  }
}

module.exports = new AppController();
