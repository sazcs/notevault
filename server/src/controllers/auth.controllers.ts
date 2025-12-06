import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { generateToken } from '../utils/jwt.js';
import { notifyUserRegistered } from '../services/n8n.service.js';

export const register = async (req: Request, res: Response) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: 'User with this email already exists',
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		const token = generateToken(user._id.toString());

		notifyUserRegistered({
			name: user.name,
			email: user.email,
			registeredAt: new Date().toISOString(),
		}).catch((err) => console.error('n8n notification failed:', err));

		res.status(201).json({
			success: true,
			message: 'User registered successfully',
			data: {
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
				},
				token,
			},
		});
	} catch (error) {
		console.error('Register error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error during registration',
		});
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user || !user.password) {
			return res.status(401).json({
				success: false,
				message: 'Invalid email or password',
			});
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				success: false,
				message: 'Invalid email or password',
			});
		}

		const token = generateToken(user._id.toString());

		res.status(200).json({
			success: true,
			message: 'Login successful',
			data: {
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
				},
				token,
			},
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error during login',
		});
	}
};
