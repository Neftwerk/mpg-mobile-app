import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
	username: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(24, 'Password must be less than 24 characters'),
});

export const signUpSchema = Yup.object().shape({
	username: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(24, 'Password must be at most 24 characters')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,24}$/,
			'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &, .)',
		),
	name: Yup.string().required('First name is required'),
	surname: Yup.string().required('Last name is required'),
	biography: Yup.string()
		.optional()
		.max(255, 'Biography must be less than 255 characters'),
});

export const forgotPasswordSchema = Yup.object().shape({
	username: Yup.string().email('Invalid email').required('Email is required'),
});

export const confirmPasswordSchema = Yup.object().shape({
	code: Yup.string()
		.length(6, 'Code must be 6 characters max')
		.required('Code is required'),
	username: Yup.string().email('Invalid email').required('Email is required'),
	newPassword: Yup.string().required('Password is required'),
});

export const confirmUserSchema = Yup.object().shape({
	code: Yup.string()
		.length(6, 'Code must be 6 characters max')
		.required('Code is required'),
	username: Yup.string().email('Invalid email').required('Email is required'),
});
