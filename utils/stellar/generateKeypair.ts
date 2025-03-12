import { Keypair } from '@stellar/stellar-sdk';

export const generateKeypair = () => {
	return Keypair.random();
};
