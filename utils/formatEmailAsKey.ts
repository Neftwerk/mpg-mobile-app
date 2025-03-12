export const formatEmailAsKey = (email: string) => {
	return email
		.replace(/[^A-Za-z0-9-_]/g, '_')
		.toLowerCase()
		.trim();
};
