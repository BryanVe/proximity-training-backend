import { Model, Column, Table, DataType } from 'sequelize-typescript'

@Table({
	paranoid: true,
	tableName: 'training',
	timestamps: false,
})
class Training extends Model {
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	})
	id!: number

	@Column({
		type: DataType.STRING,
	})
	organization!: string

	@Column({
		type: DataType.DATE,
	})
	start_date!: string

	@Column({
		type: DataType.DATE,
	})
	end_date!: string

	@Column({
		type: DataType.STRING,
	})
	DNI!: string

	@Column({
		type: DataType.STRING,
	})
	module!: string

	@Column({
		type: DataType.STRING,
	})
	scenario!: string

	@Column({
		type: DataType.STRING,
	})
	modality!: string

	@Column({
		type: DataType.STRING,
	})
	result!: string

	@Column({
		type: DataType.STRING,
	})
	critical_errors!: string

	@Column({
		type: DataType.STRING,
	})
	minor_errors!: string

	@Column({
		type: DataType.STRING,
	})
	epp_no_tomados!: string

	@Column({
		type: DataType.STRING,
	})
	epp_incorrectamente_tomados!: string

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0,
	})
	is_deleted!: number
}

export { Training }
