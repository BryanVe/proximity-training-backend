import { User } from '..'
import { UserDTO } from 'schemas'

const userDBOtoDTO = (userDBO: User): UserDTO => userDBO.get()

const get = async (
	id: number | null = null
): Promise<UserDTO[] | UserDTO | null> => {
	if (id) {
		const user = await User.findByPk(id, {
			attributes: {
				exclude: ['password'],
			},
		})

		return user ? userDBOtoDTO(user) : null
	}

	const { rows: users } = await User.findAndCountAll({
		attributes: {
			exclude: ['password'],
		},
	})

	return users.map(u => userDBOtoDTO(u))
}

const getByEmail = async (
	email: string | null = null
): Promise<UserDTO[] | UserDTO | null> => {
	if (!email) return null

	const user = await User.findOne({
		where: {
			email,
		},
	})

	return user ? userDBOtoDTO(user) : null
}

export { get, getByEmail }
