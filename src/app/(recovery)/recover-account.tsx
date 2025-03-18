import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { BackgroundWrapper } from '@/components/BackgroundWrapper/BackgroundWrapper';
import { CustomModal } from '@/components/CustomModal/CustomModal';
import { CustomInput } from '@/components/Form/CustomInput/CustomInput';
import { SubmitButton } from '@/components/Form/SubmitButton/SubmitButton';
import { accountRecoveryDomains } from '@/constants/account-recovery-domains';
import { RECOVER_ACCOUNT_INDICATIONS } from '@/constants/account-recovery-screen-text.constant';
import { recoveryAccountInputs } from '@/constants/recover-account-inputs.constants';
import { RECOVERY_MODAL } from '@/constants/recovery.modal.constant';
import { useRecoveryApi } from '@/hooks/useRecoveryApi';
import { IRecoveryCodesFormFields } from '@/interfaces/recovery/request/IRecoveryCodesFormFields.interface';
import { recoverAccountSchema } from '@/validation/schema/recover-account.schema';

const RecoverAccountScreen = () => {
	const { submitRecoveryCodes, isLoading } = useRecoveryApi();
	const defaultValues: IRecoveryCodesFormFields = {
		planetPayRecoveryCode: '',
		biggerRecoveryCode: '',
	};
	const { control, handleSubmit } = useForm<IRecoveryCodesFormFields>({
		defaultValues,
		resolver: yupResolver(recoverAccountSchema),
	});

	const fromRecoveryCodeToServerDomainKeyValueResponse = (
		data: IRecoveryCodesFormFields,
	) => {
		return {
			[accountRecoveryDomains.PLANET_PAY]: data.planetPayRecoveryCode,
			[accountRecoveryDomains.BIGGER]: data.biggerRecoveryCode,
		};
	};
	const onSubmit = async (data: IRecoveryCodesFormFields) => {
		const recoveryCodes = fromRecoveryCodeToServerDomainKeyValueResponse(data);
		await submitRecoveryCodes.mutateAsync({ codes: recoveryCodes });
	};

	return (
		<BackgroundWrapper>
			<View
				testID="recoverAccountScreen"
				className="flex top-1/4 justify-center items-center bg-white mx-8 pb-4 rounded-lg"
			>
				<Text
					className="text-2xl font-bold pt-4"
					testID="recoverAccountScreenTitle"
				>
					Recover your Account
				</Text>

				<Text
					className="text-center text-sm text-gray-500 mt-3 mx-4"
					testID="recoverAccountIndications"
				>
					{RECOVER_ACCOUNT_INDICATIONS}
				</Text>

				{recoveryAccountInputs.map(
					({ label, placeholder, name, testID, maxLength }) => (
						<CustomInput
							key={name}
							label={label}
							placeholder={placeholder}
							name={name as keyof IRecoveryCodesFormFields}
							control={control}
							maxLength={maxLength}
							testID={testID}
						/>
					),
				)}

				<SubmitButton
					label="Recover"
					testID="recoverAccountSubmitButton"
					onPress={handleSubmit(onSubmit)}
					isLoading={isLoading}
				/>
				<Text className="text-center text-xs text-gray-500 mt-14 mx-4">
					Powered by PlanetPay & Bigger
				</Text>
			</View>

			<CustomModal
				visible={isLoading}
				title={RECOVERY_MODAL.TITLE}
				message={RECOVERY_MODAL.MESSAGE}
				showLoading={true}
				testID={RECOVERY_MODAL.TEST_ID}
			/>
		</BackgroundWrapper>
	);
};

export default RecoverAccountScreen;
