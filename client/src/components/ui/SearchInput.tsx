interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	onClear: () => void;
	placeholder?: string;
}

const SearchInput = ({
	value,
	onChange,
	onClear,
	placeholder = 'Search...',
}: SearchInputProps) => {
	return (
		<div className='relative'>
			<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
				<svg
					className='w-5 h-5 text-neutral-500'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
					/>
				</svg>
			</div>
			<input
				type='text'
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className='w-full pl-10 pr-10 py-2.5 rounded-md border border-neutral-800 bg-neutral-950 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700'
			/>
			{value && (
				<button
					onClick={onClear}
					className='absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300'
				>
					<svg
						className='w-5 h-5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
			)}
		</div>
	);
};

export default SearchInput;
