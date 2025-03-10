export interface ISignUpResponse {
	externalId: string;
	uuid: string;
	username: string;
	roles: string[];
	name: string;
	surname: string;
	biography?: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string;
}
