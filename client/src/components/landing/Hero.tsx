import { Link } from 'react-router-dom';

const Hero = () => {
	return (
		<section className='mx-auto max-w-7xl px-6 pt-32 pb-20'>
			<div className='max-w-4xl'>
				<div className='inline-block rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-400 mb-6'>
					<span className='inline-block w-2 h-2 rounded-full bg-green-500 mr-2'></span>
					Now in beta
				</div>
				<h1 className='text-6xl md:text-7xl font-semibold leading-[1.1] tracking-tight'>
					Notes that scale
					<br />
					with your ideas
				</h1>
				<p className='mt-6 text-xl text-neutral-400 max-w-2xl leading-relaxed'>
					A simple, secure space for your thoughts. Tag your ideas, organize
					them effortlessly, and find them instantly when inspiration strikes.
				</p>
				<div className='mt-10'>
					<Link
						to='/register'
						className='inline-block rounded-md bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors'
					>
						Start for free
					</Link>
				</div>

				{/* Stats */}
				<div className='mt-16 grid grid-cols-3 gap-8 border-t border-neutral-800/50 pt-8'>
					<div>
						<div className='text-3xl font-semibold'>1.2ms</div>
						<div className='text-sm text-neutral-500 mt-1'>
							Avg response time
						</div>
					</div>
					<div>
						<div className='text-3xl font-semibold'>99.99%</div>
						<div className='text-sm text-neutral-500 mt-1'>Uptime</div>
					</div>
					<div>
						<div className='text-3xl font-semibold'>256-bit</div>
						<div className='text-sm text-neutral-500 mt-1'>Encryption</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
