import { User } from '..'
import { UserWithPasswordDTO } from 'schemas'

const userDBOtoDTO = (userDBO: User): UserWithPasswordDTO => userDBO.get()

const getByEmail = async (
	email: string
): Promise<UserWithPasswordDTO | null> => {
	const user = await User.findOne({
		where: {
			email,
			deleted: 0,
		},
	})

	return user ? userDBOtoDTO(user) : null
}

export { getByEmail }
