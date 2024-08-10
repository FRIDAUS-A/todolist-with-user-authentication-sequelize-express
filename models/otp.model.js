const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../config/sequelize')


const Otp = sequelize.define(
	'Otp',
	{
		otp_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		customer_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'Customers',
				key: 'customer_id'
			}
		},
		otp: {
			type: DataTypes.STRING,
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		expired_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: () => {
				return new Date(Date.now() + 60 * 1000)
			}
		}
	},
	{
		timestamps: false
	}
)

module.exports = Otp