import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
		<div className='min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-6'>
			<div className='w-full max-w-md'>
				{/* Back to home */}
				<Link
					to='/'
					className='inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-50 mb-8 transition-colors'
				>
					← Back to home
				</Link>

				{/* Register Card */}
				<div className='rounded-lg border border-neutral-800 bg-neutral-900/30 p-8'>
					<div className='mb-8'>
						<h1 className='text-2xl font-semibold mb-2'>Create an account</h1>
						<p className='text-sm text-neutral-400'>
							Get started with NoteVault today
						</p>
					</div>

					{error && (
						<div className='mb-6 rounded-md border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-400'>
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className='space-y-5'>
						{/* Name */}
						<div>
							<label className='block text-sm font-medium mb-2'>Name</label>
							<input
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700'
								placeholder='John Doe'
							/>
						</div>

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
								minLength={6}
								className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700'
								placeholder='••••••••'
							/>
							<p className='mt-1.5 text-xs text-neutral-500'>
								Must be at least 6 characters
							</p>
						</div>

						{/* Submit */}
						<button
							type='submit'
							disabled={loading}
							className='w-full rounded-md bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							{loading ? 'Creating account...' : 'Create account'}
						</button>
					</form>

					{/* Divider */}
					<div className='my-6 flex items-center gap-4'>
						<div className='h-px flex-1 bg-neutral-800'></div>
						<span className='text-xs text-neutral-500'>OR</span>
						<div className='h-px flex-1 bg-neutral-800'></div>
					</div>

					{/* Login Link */}
					<p className='text-center text-sm text-neutral-400'>
						Already have an account?{' '}
						<Link to='/login' className='text-neutral-50 hover:underline'>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
