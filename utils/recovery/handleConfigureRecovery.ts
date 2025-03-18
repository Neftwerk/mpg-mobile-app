import { Keypair } from '@stellar/stellar-sdk';

import { signTransaction } from '../stellar/signTransaction';
import { signChallenges } from './signChallenges';

import { ERROR_MESSAGES } from '@/errors/messages/error.messages';
import { recoveryService } from '@/services/recovery/recovery.service';
import { submissionService } from '@/services/submission/submission.service';

export const handleConfigureRecovery = async (
	deviceKeypair: Keypair,
	masterKeypair: Keypair,
) => {
	try {
		const {
			data: {
				attributes: { challenges },
			},
		} = await recoveryService.getAuthChallenges();

		const signedChallenges = signChallenges(masterKeypair.secret(), challenges);

		const {
			data: {
				attributes: { tokens },
			},
		} = await recoveryService.generateRecoveryTokens({
			signedChallenges,
		});
		const {
			data: {
				attributes: { xdr, signers },
			},
		} = await recoveryService.configureRecovery({
			deviceKey: deviceKeypair.publicKey(),
			tokens,
		});

		const signedTransaction = signTransaction(xdr, masterKeypair.secret());
		await submissionService.submitXdr(signedTransaction);
		await recoveryService.saveSigner({ signers });
	} catch {
		throw new Error(ERROR_MESSAGES.GENERATING_RECOVERY_ACCOUNTS);
	}
};
