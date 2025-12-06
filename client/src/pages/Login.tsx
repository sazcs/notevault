import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';
import FormInput from '../components/auth/FormInput';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			await login({ email, password });
			navigate('/dashboard');
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to login');
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthForm
			title='Welcome back'
			subtitle='Sign in to your account to continue'
			onSubmit={handleSubmit}
			submitText='Sign in'
			loading={loading}
			error={error}
			footerText="Don't have an account?"
			footerLinkText='Sign up'
			footerLinkTo='/register'
		>
			<FormInput
				label='Email'
				type='email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				disabled={loading}
				placeholder='you@example.com'
			/>
			<FormInput
				label='Password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				disabled={loading}
				placeholder='••••••••'
			/>
		</AuthForm>
	);
};

export default Login;
