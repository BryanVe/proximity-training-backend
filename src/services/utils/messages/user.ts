enum ErrorForUser {
	INVALID_CREDENTIALS = 'Las credenciales ingresadas no son válidas',
	COULD_NOT_UPDATE_PASSWORD = 'No se pudo actualizar la contraseña',
}

enum MessageForUser {
	UPDATED_PASSWORD = 'La contraseña se actualizó correctamente',
}

export { ErrorForUser as EFU, MessageForUser as MFU }
