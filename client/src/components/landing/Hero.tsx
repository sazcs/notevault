import { Link } from 'react-router-dom';
import heroImage from '/hero.png';

const Hero = () => {
	return (
		<section className='mx-auto max-w-7xl px-6 pt-20 md:pt-32 pb-16 md:pb-20'>
			<div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
				{/* Left: Text Content */}
				<div>
					<div className='inline-block rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-400 mb-6'>
						<span className='inline-block w-2 h-2 rounded-full bg-green-500 mr-2'></span>
						Now in beta
					</div>
					<h1 className='text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight'>
						Notes that scale
						<br />
						with your ideas
					</h1>
					<p className='mt-6 text-lg md:text-xl text-neutral-400 leading-relaxed'>
						A simple, secure space for your thoughts. Tag your ideas, organize
						them effortlessly, and find them instantly when inspiration strikes.
					</p>
					<div className='mt-8 md:mt-10'>
						<Link
							to='/register'
							className='inline-block rounded-md bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors'
						>
							Start for free
						</Link>
					</div>

					<div className='hidden lg:grid mt-16 grid-cols-3 gap-8 border-t border-neutral-800/50 pt-8'>
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

				<div className='order-first lg:order-last'>
					<div className='relative max-w-md mx-auto lg:max-w-none'>
						<img
							src={heroImage}
							alt='NoteVault app preview'
							className='w-xl h-auto rounded-lg border border-neutral-800 shadow-2xl'
						/>
					</div>
				</div>
			</div>

			{/* Stats - Mobile version below image */}
			<div className='grid grid-cols-3 gap-4 lg:hidden mt-12 border-t border-neutral-800/50 pt-8'>
				<div>
					<div className='text-2xl md:text-3xl font-semibold'>1.2ms</div>
					<div className='text-xs md:text-sm text-neutral-500 mt-1'>
						Avg response
					</div>
				</div>
				<div>
					<div className='text-2xl md:text-3xl font-semibold'>99.99%</div>
					<div className='text-xs md:text-sm text-neutral-500 mt-1'>Uptime</div>
				</div>
				<div>
					<div className='text-2xl md:text-3xl font-semibold'>256-bit</div>
					<div className='text-xs md:text-sm text-neutral-500 mt-1'>
						Encryption
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
