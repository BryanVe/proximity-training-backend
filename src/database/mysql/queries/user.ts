import { User } from '..'
import { UserDTO } from 'schemas'

const userDBOtoDTO = (userDBO: User): UserDTO => userDBO.get()

const getByEmail = async (email: string): Promise<UserDTO | null> => {
	const user = await User.findOne({
		where: {
			email,
		},
	})

	return user ? userDBOtoDTO(user) : null
}

export { getByEmail }
