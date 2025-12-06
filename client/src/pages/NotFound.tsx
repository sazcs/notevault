import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className='min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-6'>
			<div className='text-center'>
				<h1 className='text-9xl font-bold mb-4'>404</h1>
				<h2 className='text-2xl font-semibold mb-2'>Page not found</h2>
				<p className='text-neutral-400 mb-8'>
					The page you're looking for doesn't exist.
				</p>
				<Link
					to='/'
					className='inline-block rounded-md bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors'
				>
					Go back home
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
