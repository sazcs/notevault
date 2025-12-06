import { type FormEvent } from 'react';

interface NoteFormProps {
	title: string;
	content: string;
	tags: string;
	onTitleChange: (value: string) => void;
	onContentChange: (value: string) => void;
	onTagsChange: (value: string) => void;
	onSubmit: (e: FormEvent) => void;
	submitText: string;
	loading?: boolean;
}

const NoteForm = ({
	title,
	content,
	tags,
	onTitleChange,
	onContentChange,
	onTagsChange,
	onSubmit,
	submitText,
	loading = false,
}: NoteFormProps) => {
	return (
		<form onSubmit={onSubmit} className='space-y-4'>
			<div>
				<label className='block text-sm font-medium mb-2'>Title</label>
				<input
					type='text'
					value={title}
					onChange={(e) => onTitleChange(e.target.value)}
					required
					disabled={loading}
					className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700 disabled:opacity-50'
					placeholder='Enter note title'
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>Content</label>
				<textarea
					value={content}
					onChange={(e) => onContentChange(e.target.value)}
					required
					disabled={loading}
					rows={8}
					className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700 resize-none disabled:opacity-50'
					placeholder='Write your note here...'
				/>
			</div>

			<div>
				<label className='block text-sm font-medium mb-2'>
					Tags <span className='text-neutral-500'>(comma separated)</span>
				</label>
				<input
					type='text'
					value={tags}
					onChange={(e) => onTagsChange(e.target.value)}
					disabled={loading}
					className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700 disabled:opacity-50'
					placeholder='work, personal, ideas'
				/>
			</div>

			<button
				type='submit'
				disabled={loading}
				className='w-full rounded-md bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors disabled:opacity-50'
			>
				{loading ? 'Saving...' : submitText}
			</button>
		</form>
	);
};

export default NoteForm;
