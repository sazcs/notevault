export interface User {
	id: string;
	name: string;
	email: string;
}

export interface AuthResponse {
	success: boolean;
	message: string;
	data: {
		user: User;
		token: string;
	};
}

export interface RegisterData {
	name: string;
	email: string;
	password: string;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface Note {
	_id: string;
	title: string;
	content: string;
	tags: string[];
	userId: string;
	createdAt: string;
	updatedAt: string;
}
