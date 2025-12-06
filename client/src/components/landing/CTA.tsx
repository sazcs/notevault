import { Link } from 'react-router-dom';

const CTA = () => {
	return (
		<section className='mx-auto max-w-7xl px-6 py-32'>
			<div className='text-center max-w-2xl mx-auto'>
				<h2 className='text-4xl md:text-5xl font-semibold leading-tight'>
					Start building today
				</h2>
				<p className='mt-4 text-lg text-neutral-400'>
					Free tier includes 1000 notes. No credit card required.
				</p>
				<Link
					to='/register'
					className='mt-8 inline-block rounded-md bg-neutral-50 px-6 py-3 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors'
				>
					Create account →
				</Link>
			</div>
		</section>
	);
};

export default CTA;
