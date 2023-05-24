import { Model, Column, Table, DataType } from 'sequelize-typescript'

@Table({
	paranoid: true,
	tableName: 'user',
	timestamps: false,
})
class User extends Model {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	})
	id!: number

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	user!: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	password!: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	email!: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	organization!: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0,
	})
	is_deleted!: number
}

export { User }
