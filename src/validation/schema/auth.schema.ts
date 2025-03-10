import * as Yup from 'yup';

import { AUTH_ERROR_MESSAGES } from '@/constants/errors';

const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,24}$/;

export const loginSchema = Yup.object().shape({
	username: Yup.string()
		.email(AUTH_ERROR_MESSAGES.EMAIL_INVALID_ERROR_MESSAGE)
		.required(AUTH_ERROR_MESSAGES.EMAIL_REQUIRED_ERROR_MESSAGE),
	password: Yup.string().required(
		AUTH_ERROR_MESSAGES.PASSWORD_REQUIRED_ERROR_MESSAGE,
	),
});

export const signUpSchema = Yup.object().shape({
	username: Yup.string()
		.email(AUTH_ERROR_MESSAGES.EMAIL_INVALID_ERROR_MESSAGE)
		.required(AUTH_ERROR_MESSAGES.EMAIL_REQUIRED_ERROR_MESSAGE),
	password: Yup.string()
		.required(AUTH_ERROR_MESSAGES.PASSWORD_REQUIRED_ERROR_MESSAGE)
		.min(8, AUTH_ERROR_MESSAGES.PASSWORD_MIN_LENGTH_ERROR_MESSAGE)
		.max(24, AUTH_ERROR_MESSAGES.PASSWORD_MAX_LENGTH_ERROR_MESSAGE)
		.matches(
			PASSWORD_REGEX,
			AUTH_ERROR_MESSAGES.PASSWORD_REGEX_MATCH_ERROR_MESSAGE,
		),
	name: Yup.string().required(AUTH_ERROR_MESSAGES.NAME_REQUIRED_ERROR_MESSAGE),
	surname: Yup.string().required(
		AUTH_ERROR_MESSAGES.SURNAME_REQUIRED_ERROR_MESSAGE,
	),
	biography: Yup.string()
		.optional()
		.max(255, AUTH_ERROR_MESSAGES.BIOGRAPHY_MAX_LENGTH_ERROR_MESSAGE),
});

export const forgotPasswordSchema = Yup.object().shape({
	username: Yup.string()
		.email(AUTH_ERROR_MESSAGES.EMAIL_INVALID_ERROR_MESSAGE)
		.required(AUTH_ERROR_MESSAGES.EMAIL_REQUIRED_ERROR_MESSAGE),
});

export const confirmPasswordSchema = Yup.object().shape({
	code: Yup.string()
		.length(6, AUTH_ERROR_MESSAGES.CODE_LENGTH_ERROR_MESSAGE)
		.required(AUTH_ERROR_MESSAGES.CODE_REQUIRED_ERROR_MESSAGE),
	username: Yup.string()
		.email(AUTH_ERROR_MESSAGES.EMAIL_INVALID_ERROR_MESSAGE)
		.required(AUTH_ERROR_MESSAGES.EMAIL_REQUIRED_ERROR_MESSAGE),
	newPassword: Yup.string().required(
		AUTH_ERROR_MESSAGES.PASSWORD_REQUIRED_ERROR_MESSAGE,
	),
});

export const confirmUserSchema = Yup.object().shape({
	code: Yup.string()
		.length(6, AUTH_ERROR_MESSAGES.CODE_LENGTH_ERROR_MESSAGE)
		.required(AUTH_ERROR_MESSAGES.CODE_REQUIRED_ERROR_MESSAGE),
	username: Yup.string()
		.email(AUTH_ERROR_MESSAGES.EMAIL_INVALID_ERROR_MESSAGE)
		.required(AUTH_ERROR_MESSAGES.EMAIL_REQUIRED_ERROR_MESSAGE),
});
