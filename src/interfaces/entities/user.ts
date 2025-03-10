import { Base } from './base';

import { AppRole } from '@/types/enum/app-role.enum';

export interface IUser extends Base {
	username: string;
	name: string;
	surname: string;
	biography?: string;
	externalId?: string;
	roles: AppRole[];
}
