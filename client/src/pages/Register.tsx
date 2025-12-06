import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';
import FormInput from '../components/auth/FormInput';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			await register({ name, email, password });
			navigate('/dashboard');
		} catch (err: any) {
			const errorMessage =
				err.response?.data?.message ||
				err.response?.data?.errors?.[0]?.message ||
				'Failed to register';
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthForm
			title='Create an account'
			subtitle='Get started with NoteVault today'
			onSubmit={handleSubmit}
			submitText='Create account'
			loading={loading}
			error={error}
			footerText='Already have an account?'
			footerLinkText='Sign in'
			footerLinkTo='/login'
		>
			<FormInput
				label='Name'
				type='text'
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
				disabled={loading}
				placeholder='John Doe'
			/>
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
				minLength={8}
				disabled={loading}
				placeholder='••••••••'
			/>
			<p className='text-xs text-neutral-500 -mt-3'>
				Must be at least 8 characters
			</p>
		</AuthForm>
	);
};

export default Register;
