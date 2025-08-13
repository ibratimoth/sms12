const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redisClient = require('../config/redis');

require('dotenv').config();

console.log('App: Initializing Redis session store...');

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'sms:',
});

module.exports = function configureSession(app) {
  app.use(
    session({
      name: 'sms.sid',
      store: redisStore,
      secret: process.env.SESSION_SECRET || 'secretkey',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 86400000, // 24 hours
      },
    })
  );
};