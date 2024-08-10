require('dotenv').config()
const { Sequelize } = require('sequelize');
const DATABASE_NAME = process.env.DATABASE_NAME || 'database'
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'password'
const DATABASE_PORT = process.env.DATABASE_PORT || 3306
const DATABASE_USER = process.env.DATABASE_USERNAME
const DATABASE_HOST = process.env.DATABASE_HOST


const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, {
	host: DATABASE_HOST,
	port: DATABASE_PORT,
	dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

  module.exports = sequelize