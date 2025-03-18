import { Keypair, Networks, TransactionBuilder } from '@stellar/stellar-sdk';

const stellarNetwork =
	process.env.EXPO_PUBLIC_STELLAR_NETWORK ?? Networks.TESTNET;

export const signTransaction = (xdr: string, secretKey: string) => {
	const keypair = Keypair.fromSecret(secretKey);
	const transaction = TransactionBuilder.fromXDR(xdr, stellarNetwork);
	transaction.sign(keypair);
	return transaction.toXDR();
};
