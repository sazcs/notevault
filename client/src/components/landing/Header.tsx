import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header className='border-b border-neutral-800/50'>
			<nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
				<Link to='/' className='flex items-center gap-2'>
					<div className='h-6 w-6 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center'>
						<span className='text-xs font-medium text-neutral-400'>N</span>
					</div>
					<span className='text-sm font-medium'>NoteVault</span>
				</Link>

				<div className='flex items-center gap-4'>
					<Link
						to='/login'
						className='rounded-md border border-neutral-800 bg-neutral-900/30 px-3.5 py-1.5 text-sm font-medium hover:bg-neutral-900/50 transition-colors'
					>
						Sign in
					</Link>
					<Link
						to='/register'
						className='rounded-md bg-neutral-50 px-3.5 py-1.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors'
					>
						Get started
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Header;
