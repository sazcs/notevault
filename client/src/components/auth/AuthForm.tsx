import type { FormEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthFormProps {
	title: string;
	subtitle: string;
	onSubmit: (e: FormEvent) => void;
	submitText: string;
	loading: boolean;
	error?: string;
	children: ReactNode;
	footerText: string;
	footerLinkText: string;
	footerLinkTo: string;
}

const AuthForm = ({
	title,
	subtitle,
	onSubmit,
	submitText,
	loading,
	error,
	children,
	footerText,
	footerLinkText,
	footerLinkTo,
}: AuthFormProps) => {
	return (
		<div className='min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-6'>
			<div className='w-full max-w-md'>
				<Link
					to='/'
					className='inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-50 mb-8 transition-colors'
				>
					← Back to home
				</Link>

				<div className='rounded-lg border border-neutral-800 bg-neutral-900/30 p-8'>
					<div className='mb-8'>
						<h1 className='text-2xl font-semibold mb-2'>{title}</h1>
						<p className='text-sm text-neutral-400'>{subtitle}</p>
					</div>

					{error && (
						<div className='mb-6 rounded-md border border-red-900/50 bg-red-950/50 p-3 text-sm text-red-400'>
							{error}
						</div>
					)}

					<form onSubmit={onSubmit} className='space-y-5'>
						{children}

						<button
							type='submit'
							disabled={loading}
							className='w-full rounded-md bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
						>
							{loading ? 'Loading...' : submitText}
						</button>
					</form>

					<div className='my-6 flex items-center gap-4'>
						<div className='h-px flex-1 bg-neutral-800'></div>
						<span className='text-xs text-neutral-500'>OR</span>
						<div className='h-px flex-1 bg-neutral-800'></div>
					</div>

					<p className='text-center text-sm text-neutral-400'>
						{footerText}{' '}
						<Link to={footerLinkTo} className='text-neutral-50 hover:underline'>
							{footerLinkText}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
