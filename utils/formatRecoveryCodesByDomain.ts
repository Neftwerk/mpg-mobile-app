import { accountRecoveryDomains } from '@/constants/account-recovery-domains';
import { IRecoveryCodesFormFields } from '@/interfaces/recovery/request/IRecoveryCodesFormFields.interface';

export const formatRecoveryCodesByDomain = (data: IRecoveryCodesFormFields) => {
	return {
		[accountRecoveryDomains.PLANET_PAY]: data.planetPayRecoveryCode,
		[accountRecoveryDomains.BIGGER]: data.biggerRecoveryCode,
	};
};
