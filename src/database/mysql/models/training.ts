import { Model, Column, Table, DataType } from 'sequelize-typescript'
import { parseValueToArray } from '../utils'

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
	organization?: string

	@Column({
		type: DataType.DATE,
		field: 'start_date',
	})
	startDate?: string

	@Column({
		type: DataType.DATE,
		field: 'end_date',
	})
	endDate?: string

	@Column({
		type: DataType.STRING,
		field: 'DNI',
	})
	dni?: string

	@Column({
		type: DataType.STRING,
	})
	module?: string

	@Column({
		type: DataType.STRING,
	})
	scenario?: string

	@Column({
		type: DataType.STRING,
	})
	modality?: string

	@Column({
		type: DataType.STRING,
	})
	result?: string

	@Column({
		type: DataType.STRING,
		field: 'critical_errors',
		get() {
			return parseValueToArray(this.getDataValue('criticalErrors'))
		},
	})
	criticalErrors!: string[]

	@Column({
		type: DataType.STRING,
		field: 'minor_errors',
		get() {
			return parseValueToArray(this.getDataValue('minorErrors'))
		},
	})
	minorErrors!: string[]

	@Column({
		type: DataType.STRING,
		field: 'epp_no_tomados',
		get() {
			return parseValueToArray(this.getDataValue('eppNoTomados'))
		},
	})
	eppNoTomados!: string[]

	@Column({
		type: DataType.STRING,
		field: 'epp_incorrectamente_tomados',
		get() {
			return parseValueToArray(this.getDataValue('eppIncorrectamenteTomados'))
		},
	})
	eppIncorrectamenteTomados!: string[]

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0,
		field: 'is_deleted',
	})
	deleted!: number
}

export { Training }
