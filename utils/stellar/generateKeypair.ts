import { Keypair } from '@stellar/stellar-sdk';
import { Buffer } from 'buffer';
import * as Crypto from 'expo-crypto';

export const generateKeypair = () => {
	const randomBytes = Crypto.getRandomBytes(32);
	const keypair = Keypair.fromRawEd25519Seed(Buffer.from(randomBytes));
	return keypair;
};
