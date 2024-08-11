const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')

const Customer = sequelize.define(
	'Customer',
	{
		customer_id: {
			type:DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		othernames: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_email_verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		hash: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		salt: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		updated_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	},
	{
		timestamps: false
	}
)


module.exports = { Customer }