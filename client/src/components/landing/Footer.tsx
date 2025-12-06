const Footer = () => {
	return (
		<footer className='border-t border-neutral-800/50'>
			<div className='mx-auto max-w-7xl px-6 py-8'>
				<p className='text-center text-sm text-neutral-500'>
					© {new Date().getFullYear()} NoteVault. Made with ❤️ by{' '}
					<a
						href='https://x.com/saztwt'
						target='_blank'
						rel='noopener noreferrer'
						className='text-neutral-400 hover:text-neutral-300 transition-colors'
					>
						Saz
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
