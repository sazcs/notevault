import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
		<div className='min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-6'>
			<div className='w-full max-w-md'>
				{/* Back to home */}
				<Link
					to='/'
					className='inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-50 mb-8 transition-colors'
				>
					← Back to home
				</Link>

				{/* Login Card */}
				<div className='rounded-lg border border-neutral-800 bg-neutral-900/30 p-8'>
					<div className='mb-8'>
						<h1 className='text-2xl font-semibold mb-2'>Welcome back</h1>
						<p className='text-sm text-neutral-400'>
							Sign in to your account to continue
						</p>
					</div>

					{error && (
						<div className='mb-6 rounded-md border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-400'>
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className='space-y-5'>
						{/* Email */}
						<div>
							<label className='block text-sm font-medium mb-2'>Email</label>
							<input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700'
								placeholder='you@example.com'
							/>
						</div>

						{/* Password */}
						<div>
							<label className='block text-sm font-medium mb-2'>Password</label>
							<input
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700'
								placeholder='••••••••'
							/>
						</div>

						{/* Submit */}
						<button
							type='submit'
							disabled={loading}
							className='w-full rounded-md bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							{loading ? 'Signing in...' : 'Sign in'}
						</button>
					</form>

					{/* Divider */}
					<div className='my-6 flex items-center gap-4'>
						<div className='h-px flex-1 bg-neutral-800'></div>
						<span className='text-xs text-neutral-500'>OR</span>
						<div className='h-px flex-1 bg-neutral-800'></div>
					</div>

					{/* Register Link */}
					<p className='text-center text-sm text-neutral-400'>
						Don't have an account?{' '}
						<Link to='/register' className='text-neutral-50 hover:underline'>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
