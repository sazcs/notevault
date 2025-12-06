const Loader = () => {
	return (
		<div className='flex items-center justify-center py-12'>
			<div className='flex gap-2'>
				<div className='w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.3s]'></div>
				<div className='w-2 h-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.15s]'></div>
				<div className='w-2 h-2 rounded-full bg-neutral-400 animate-bounce'></div>
			</div>
		</div>
	);
};

export default Loader;
