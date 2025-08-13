const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const dotenv = require('dotenv');

dotenv.config();

class TokenService {
    async generateTokens(userId) {
        const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET || 'asdfghb!@#$', {
            expiresIn: '15m',
        });

        const refreshToken = jwt.sign({ userId }, process.env.JWT_SECRET || 'asdfghb!@#$', {
            expiresIn: '7d',
        });

         await redisClient.setex(`refresh:${userId}`, 7 * 24 * 60 * 60, refreshToken);
        return { accessToken, refreshToken };
    }

    setCookies(res, accessToken, refreshToken) {
        const isProduction = process.env.NODE_ENV === 'production';

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
    }

    async generateTokensAndSetCookies(res, userId) {
        const { accessToken, refreshToken } = await this.generateTokens(userId);
        this.setCookies(res, accessToken, refreshToken);
        return { accessToken, refreshToken };
    }
}

module.exports = TokenService;