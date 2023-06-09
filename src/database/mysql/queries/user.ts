import { User } from '..'
import { UpdatePasswordDTO, UserWithPasswordDTO } from 'schemas'

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

const updatePassword = async (args: UpdatePasswordDTO): Promise<number> => {
	const { userId, password } = args

	const [affectedCount] = await User.update(
		{
			password,
		},
		{
			where: {
				id: userId,
			},
		}
	)

	return affectedCount
}

export { getByEmail, updatePassword }
