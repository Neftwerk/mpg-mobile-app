import { WIREMOCK_URL } from '@/constants/wiremock.constant';

export const wiremock = {
	async reset() {
		await fetch(`${WIREMOCK_URL}/__admin/reset`, { method: 'POST' });
	},

	async loadAuthMappings() {
		await fetch(`${WIREMOCK_URL}/__admin/mappings/import`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				mappings: [
					'auth-POST-sign-in.json',
					'auth-POST-sign-up.json',
					'auth-POST-confirm-user.json',
					'auth-POST-forgot-password.json',
					'auth-POST-reset-password.json',
					'auth-POST-refresh-session.json',
					'user-GET-me.json',
				],
			}),
		});
	},

	async setupForAuth() {
		await this.reset();
		await this.loadAuthMappings();
	},
};
