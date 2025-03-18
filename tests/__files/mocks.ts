export const mockSignInResponse = {
	data: {
		type: 'authentication',
		attributes: {
			accessToken:
				'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InhZSVoxVVlXRzBmTno5YVFmcTQzZyJ9.eyJpc3MiOiJodHRwczovL2Rldi00ZTM2ZHpiNmFqeDd1d3Y4LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2N2JmN2VkN2YxM2RhOGJhYzRkYTNkMTMiLCJhdWQiOlsiaHR0cHM6Ly9yZWdlbi14LmRldi5jb20iLCJodHRwczovL2Rldi00ZTM2ZHpiNmFqeDd1d3Y4LnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3NDA3Njk1MjQsImV4cCI6MTc0MDc2OTU4NCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCB1cGRhdGU6dXNlcnMgcmVhZDp1c2VycyBvZmZsaW5lX2FjY2VzcyIsImd0eSI6InBhc3N3b3JkIiwiYXpwIjoienhuS0tIMFgwaFhkSlBEQ3NDWWhQMUVxbHdMcDhLbnkifQ.Zd1ZmoMrxugLmhVq8NPXT-Wm6kUwmQYdQpmnST3Up6uIVn4ATzDuQ4sCC6yczBKedfdm5KAZ2kYNcxlkbEiiC3tLPO_9HZWz3knElv7jM5XmtDND8MZxS_HdTjMH3RAG63JhYv3MOlEmkoBViONJoE-Pn7a4xUROgQ8b8x9H3TCy5kzCwFbjcjeVcztCEEIkdSNxuxGFwL-MRCshd2g3xJdLqS-sOsJzUZVE2YKjTaohbMh9JO4f8hcN6TTOIAiZdFZvDFzBXLhT0ZKlXToPj6looLycuxpju_8vrnGlGDz6mVOKBkq-XlWGwVJmUTVaJEfUiBKoxO3_uhyfTtyWKA',
			refreshToken: 'QsV6Uk63eoBbRxTIt6yaNvhxrVLIiJY1ilT3FEe0Tb7gG',
		},
	},
	links: {
		self: 'http://localhost:5000/api/v1/auth/sign-in',
	},
};

export const mockGetMeResponse = {
	data: {
		type: 'user',
		attributes: {
			username: 'test@example.com',
			externalId: '1234567890',
			uuid: '1234567890',
			roles: ['user'],
			name: 'Test User',
			surname: 'Test User',
			createdAt: '2021-01-01',
			updatedAt: '2021-01-01',
		},
	},
	links: {
		self: 'http://localhost:5000/api/v1/users/1',
	},
};

export const mockCreateWalletResponse = {
	data: {
		type: 'xdr',
		attributes: {
			xdr: 'AAAAAgAAAACtO4XLhxImozBDoTidJKBECVKijNEvpxlfjJHzGql/sAAABkAAFm14AAAACwAAAAEAAAAAAAAAAAAAAABn0H5wAAAAAAAAAAQAAAABAAAAAK07hcuHEiajMEOhOJ0koEQJUqKM0S+nGV+MkfMaqX+wAAAAEAAAAACUPerht88sgTbsxRHnwsesEnhb7yeh44ng/p2udssHwgAAAAEAAAAArTuFy4cSJqMwQ6E4nSSgRAlSoozRL6cZX4yR8xqpf7AAAAAAAAAAAJQ96uG3zyyBNuzFEefCx6wSeFvvJ6HjieD+na52ywfCAAAAAAL68IAAAAABAAAAAJQ96uG3zyyBNuzFEefCx6wSeFvvJ6HjieD+na52ywfCAAAABgAAAAFVU0RDAAAAACzBL+oSPrC5ICojTh8TqhPOYTUsqKwctXfdXRBSyExDf/////////8AAAABAAAAAJQ96uG3zyyBNuzFEefCx6wSeFvvJ6HjieD+na52ywfCAAAAEQAAAAAAAAACGql/sAAAAEAWIAeHmUZjxbtaCYwi86apg17VA0J5Uzj8B1MgXkV2HMd2wJMk1Cj6/fzVHj9/ERZ6+H6O5Y8RVf7FnRzKtiwKdssHwgAAAEBtflwjY543x3tp4OXKugmUp7m1wmKkpCCoE95GUXnmnspqxapHpZWmI0/kUdXqicU77NZi1EEuGXODbvEyIRQP',
		},
	},
	links: {
		self: 'http://localhost:5001/api/v1/user/create-wallet',
	},
};

export const mockSubmitXdrResponse = {
	data: {
		type: 'submission',
		attributes: {
			hash: '1234567890',
			successful: true,
		},
	},
	links: {
		self: 'http://localhost:5001/api/v1/submission',
	},
};
export const mockAddWalletToUserResponse = {
	data: {
		type: 'user',
		attributes: {
			...mockGetMeResponse.data.attributes,
			wallet: 'GCDMWZ3ZVUT6BV2KDODWPLFITF2OV2LUZVRZRFIGTWSSOA2KPXTRR6BB',
		},
	},
	links: {
		self: 'http://localhost:5001/api/v1/user',
	},
};

export const mockAuthenticateWithVerificationCodeResponse = {
	data: {
		type: 'authentication',
		attributes: {
			externalAuthTokens: {
				'local.recovery.io': 'token',
				'recovery-local.systems': 'token',
			},
		},
	},
	links: {
		self: 'http://localhost:5001/api/v1/auth/authenticate-with-verification-code',
	},
};

export const mockRecoverAccountResponse = {
	data: {
		type: 'xdr',
		attributes: {
			xdr: 'AAAAAgAAAACtO4XLhxImozBDoTidJKBECVKijNEvpxlfjJHzGql/sAAABkAAFm14AAAACwAAAAEAAAAAAAAAAAAAAABn0H5wAAAAAAAAAAQAAAABAAAAAK07hcuHEiajMEOhOJ0koEQJUqKM0S+nGV+MkfMaqX+wAAAAEAAAAACUPerht88sgTbsxRHnwsesEnhb7yeh44ng/p2udssHwgAAAAEAAAAArTuFy4cSJqMwQ6E4nSSgRAlSoozRL6cZX4yR8xqpf7AAAAAAAAAAAJQ96uG3zyyBNuzFEefCx6wSeFvvJ6HjieD+na52ywfCAAAAAAL68IAAAAABAAAAAJQ96uG3zyyBNuzFEefCx6wSeFvvJ6HjieD+na52ywfCAAAABgAAAAFVU0RDAAAAACzBL+oSPrC5ICojTh8TqhPOYTUsqKwctXfdXRBSyExDf/////////8AAAABAAAAAJQ96uG3zyyBNuzFEefCx6wSeFvvJ6HjieD+na52ywfCAAAAEQAAAAAAAAACGql/sAAAAEAWIAeHmUZjxbtaCYwi86apg17VA0J5Uzj8B1MgXkV2HMd2wJMk1Cj6/fzVHj9/ERZ6+H6O5Y8RVf7FnRzKtiwKdssHwgAAAEBtflwjY543x3tp4OXKugmUp7m1wmKkpCCoE95GUXnmnspqxapHpZWmI0/kUdXqicU77NZi1EEuGXODbvEyIRQP',
		},
	},
	links: {
		self: 'http://localhost:5001/api/v1/recovery',
	},
};

export const mockGenerateServersSignaturesResponse = mockRecoverAccountResponse;
