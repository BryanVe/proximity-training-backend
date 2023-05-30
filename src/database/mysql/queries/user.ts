import { User } from '..'
import { UserDTO } from 'schemas'

const userDBOtoDTO = (userDBO: User): UserDTO => userDBO.get()

const getByEmail = async (email: string): Promise<UserDTO | null> => {
	const user = await User.findOne({
		where: {
			email,
			deleted: 0,
		},
	})

	return user ? userDBOtoDTO(user) : null
}

export { getByEmail }
