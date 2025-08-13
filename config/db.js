const { Sequelize } = require('sequelize');
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  });

const connectionDB = async() => {
    try {
        await sequelize.authenticate();
        console.log(`Connection has been established successfully to database ${process.env.DB_NAME}.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {connectionDB, sequelize}