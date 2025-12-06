const CodePreview = () => {
	return (
		<section className='mx-auto max-w-7xl px-6 py-20'>
			<div className='rounded-lg border border-neutral-800 bg-neutral-900/50 p-1'>
				<div className='rounded-md bg-neutral-950 p-6'>
					<div className='flex items-center gap-2 mb-4'>
						<div className='w-3 h-3 rounded-full bg-red-500'></div>
						<div className='w-3 h-3 rounded-full bg-yellow-500'></div>
						<div className='w-3 h-3 rounded-full bg-green-500'></div>
						<span className='ml-2 text-xs text-neutral-500'>API Response</span>
					</div>
					<pre className='text-sm text-neutral-300 font-mono'>
						{`{
  "success": true,
  "data": {
    "title": "Meeting Notes",
    "content": "Discussed Q1 roadmap...",
    "tags": ["work", "planning"],
    "createdAt": "2025-01-15T10:30:00Z"
  }
}`}
					</pre>
				</div>
			</div>
		</section>
	);
};

export default CodePreview;
