enum ErrorForUser {
	NOT_FOUND = 'The requested user does not exists',
	INVALID_CREDENTIALS = 'The given credentials are not valid',
}

enum MessageForUser {
	ALL_USERS_DELETED = 'All the users were deleted successfully',
	USER_DELETED = 'The requested user was successfully deleted',
}

export { ErrorForUser as EFU, MessageForUser as MFU }
