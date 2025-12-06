import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
	const secret = process.env.JWT_SECRET as string;
	const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

	return jwt.sign({ id: userId }, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string) => {
	const secret = process.env.JWT_SECRET as string;
	return jwt.verify(token, secret);
};
