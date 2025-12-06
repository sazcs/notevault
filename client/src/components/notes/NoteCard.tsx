import { Link } from 'react-router-dom';
import type { Note } from '../../types';

interface NoteCardProps {
	note: Note;
	onEdit: (note: Note) => void;
	onDelete: (note: Note) => void;
}

const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
	return (
		<div className='rounded-lg border border-neutral-800 bg-neutral-900/30 hover:border-neutral-700 transition-colors'>
			<Link to={`/notes/${note._id}`} className='block p-6'>
				<h3 className='text-lg font-semibold mb-2 truncate'>{note.title}</h3>
				<p className='text-sm text-neutral-400 mb-4 line-clamp-3'>
					{note.content}
				</p>

				{note.tags.length > 0 && (
					<div className='flex flex-wrap gap-2 mb-4'>
						{note.tags.map((tag, index) => (
							<span
								key={index}
								className='px-2 py-1 text-xs rounded-md bg-neutral-800 text-neutral-300'
							>
								{tag}
							</span>
						))}
					</div>
				)}
			</Link>

			<div className='flex items-center justify-between px-6 pb-6 pt-0 border-t border-neutral-800/50 text-xs'>
				<span className='text-neutral-500'>
					{new Date(note.createdAt).toLocaleDateString()}
				</span>
				<div className='flex gap-2'>
					<button
						onClick={(e) => {
							e.preventDefault();
							onEdit(note);
						}}
						className='p-2 rounded-md hover:bg-neutral-800 transition-colors'
						aria-label='Edit note'
					>
						<svg
							className='w-4 h-4 text-neutral-400'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
							/>
						</svg>
					</button>
					<button
						onClick={(e) => {
							e.preventDefault();
							onDelete(note);
						}}
						className='p-2 rounded-md hover:bg-neutral-800 transition-colors'
						aria-label='Delete note'
					>
						<svg
							className='w-4 h-4 text-red-400'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default NoteCard;
