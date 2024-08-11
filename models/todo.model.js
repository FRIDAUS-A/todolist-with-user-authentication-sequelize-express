const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/sequelize')


const Todo =  sequelize.define(
	'Todo',
	{
		todo_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		customer_id: {
			type: DataTypes.STRING,
			allowNull: false,
			refereences: {
				model: 'Customers',
				key: 'customer_id'
			}
		},
		todo_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		todo_description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.ENUM('pending', 'completed'),
			allowNull: false,
			defaultValue: 'pending'
		},
		is_deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	},
	{
		timestamps: false
	}
)

module.exports = Todo 