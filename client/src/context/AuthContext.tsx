import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from 'react';
import api from '../lib/api';
import type { User, AuthResponse, RegisterData, LoginData } from '../types';

interface AuthContextType {
	user: User | null;
	token: string | null;
	loading: boolean;
	login: (data: LoginData) => Promise<void>;
	register: (data: RegisterData) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const register = async (data: RegisterData) => {
		const response = await api.post<AuthResponse>('/auth/register', data);
		const { user, token } = response.data.data;

		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));

		setToken(token);
		setUser(user);
	};

	const login = async (data: LoginData) => {
		const response = await api.post<AuthResponse>('/auth/login', data);
		const { user, token } = response.data.data;

		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));

		setToken(token);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setToken(null);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ user, token, loading, login, register, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within AuthProvider');
	}
	return context;
};
