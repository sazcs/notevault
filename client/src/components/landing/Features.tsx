const Features = () => {
	const features = [
		{
			icon: '⚡',
			number: '01',
			title: 'Lightning fast',
			description:
				'Built on modern infrastructure. Search through thousands of notes in milliseconds.',
		},
		{
			icon: '🔐',
			number: '02',
			title: 'End-to-end encrypted',
			description:
				'Your notes are encrypted before they leave your device. Not even we can read them.',
		},
		{
			icon: '🔍',
			number: '03',
			title: 'Instant search',
			description:
				'Full-text search across all your notes. Find that idea from months ago in seconds.',
		},
		{
			icon: '🏷️',
			number: '04',
			title: 'Tag everything',
			description:
				'No folders, no complexity. Just tag your notes and find them when you need them.',
		},
	];

	return (
		<section className='mx-auto max-w-7xl px-6 py-20'>
			<div className='grid md:grid-cols-2 gap-4'>
				{features.map((feature) => (
					<div
						key={feature.number}
						className='rounded-lg border border-neutral-800 bg-neutral-900/30 p-8 hover:border-neutral-700 transition-colors'
					>
						<div className='flex items-start justify-between mb-4'>
							<div className='flex h-10 w-10 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900'>
								<span className='text-lg'>{feature.icon}</span>
							</div>
							<span className='text-xs text-neutral-500'>{feature.number}</span>
						</div>
						<h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
						<p className='text-sm text-neutral-400 leading-relaxed'>
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Features;
