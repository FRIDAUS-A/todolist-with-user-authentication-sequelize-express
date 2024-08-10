const { Sequelite, DataTypes } = require('sequelize')


const Todo =  sequelize.define(
	'Todo',
	{
		todo_id: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
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
			default: DataTypes.NOW
		},
		updated_at: {
			type: DataTypes.DATE,
			default: DataTypes.NOW
		}
	},
	{
		timestamps: false
	}
)

module.exports = Todo