import { Keypair, Networks, TransactionBuilder } from '@stellar/stellar-sdk';

export const signTransaction = (xdr: string, secretKey: string) => {
	const keypair = Keypair.fromSecret(secretKey);
	const transaction = TransactionBuilder.fromXDR(xdr, Networks.TESTNET);
	transaction.sign(keypair);
	return transaction.toXDR();
};
