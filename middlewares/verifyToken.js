const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const util = require('util');
const dotenv = require('dotenv');

dotenv.config();

class AuthMiddleware {
  verifyToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      return next();
    } catch (accessErr) {
      console.log('Access token expired or invalid:', accessErr.message);
    }

    if (!refreshToken) {
      if (req.session) {
        req.session.destroy(err => {
          if (err) {
            console.error('Error destroying session:', err);
          }
        });
      }
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.redirect('/');
    }

    try {
      const refreshDecoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
      const userId = refreshDecoded.userId;

      const storedToken = await redisClient.get(`refresh:${userId}`); // Direct promise usage
      if (!storedToken || storedToken !== refreshToken) {
        console.warn('Refresh token mismatch or not found in Redis.');
        if (req.session) {
          req.session.destroy(err => {
            if (err) {
              console.error('Error destroying session:', err);
            }
          });
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.redirect('/');
      }

      const newAccessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const newRefreshToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      await redisClient.setex(`refresh:${userId}`, 7 * 24 * 60 * 60, newRefreshToken);
      console.log(`new token issued`);

      req.userId = userId;
      return next();
    } catch (refreshErr) {
      console.error('Refresh token error:', refreshErr.message);
      if (req.session) {
        req.session.destroy(err => {
          if (err) {
            console.error('Error destroying session:', err);
          }
        });
      }
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.redirect('/');
    }
  };
}

module.exports = AuthMiddleware;