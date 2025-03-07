import { IUser } from '../entities/user';

export interface IAuthContextType {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: IUser | null;
	setUser: (user: IUser | null) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
	logout: VoidFunction;
	checkAuth: VoidFunction;
}
