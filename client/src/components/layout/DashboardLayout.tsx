import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<div className='min-h-screen bg-neutral-950 text-neutral-50'>
			{/* Header */}
			<header className='border-b border-neutral-800/50 sticky top-0 bg-neutral-950/80 backdrop-blur-md z-10'>
				<nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
					<Link to='/dashboard' className='flex items-center gap-2'>
						<div className='h-6 w-6 rounded border border-neutral-700 bg-neutral-900 flex items-center justify-center'>
							<span className='text-xs font-medium text-neutral-400'>N</span>
						</div>
						<span className='text-sm font-medium'>NoteVault</span>
					</Link>

					<div className='flex items-center gap-4'>
						<span className='text-sm text-neutral-400'>Hey, {user?.name}</span>
						<button
							onClick={handleLogout}
							className='rounded-md border border-neutral-800 px-3.5 py-1.5 text-sm font-medium hover:bg-neutral-900/50 transition-colors'
						>
							Logout
						</button>
					</div>
				</nav>
			</header>

			{/* Main Content */}
			<main>{children}</main>
		</div>
	);
};

export default DashboardLayout;
