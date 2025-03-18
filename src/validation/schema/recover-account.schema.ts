import * as Yup from 'yup';

import { ERROR_MESSAGES } from '@/errors/messages/error.messages';

export const recoverAccountSchema = Yup.object().shape({
	planetPayRecoveryCode: Yup.string()
		.required(ERROR_MESSAGES.RECOVERY_CODE_REQUIRED_ERROR_MESSAGE)
		.max(5, ERROR_MESSAGES.RECOVERY_CODE_MAX_LENGTH_ERROR_MESSAGE),
	biggerRecoveryCode: Yup.string()
		.required(ERROR_MESSAGES.RECOVERY_CODE_REQUIRED_ERROR_MESSAGE)
		.max(5, ERROR_MESSAGES.RECOVERY_CODE_MAX_LENGTH_ERROR_MESSAGE),
});
