import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useNotes } from '../context/NotesContext';
import Modal from '../components/ui/Modal';
import ConfirmModal from '../components/ui/ConfirmModal';
import Loader from '../components/ui/Loader';
import type { Note } from '../types';

const Dashboard = () => {
	const {
		notes,
		loading,
		error,
		fetchNotes,
		createNote,
		updateNote,
		deleteNote,
	} = useNotes();

	// Modal states
	const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);
	const [deleteLoading, setDeleteLoading] = useState(false);

	// Form states
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState('');
	const [formLoading, setFormLoading] = useState(false);

	useEffect(() => {
		fetchNotes();
	}, []);

	const openCreateModal = () => {
		setSelectedNote(null);
		setTitle('');
		setContent('');
		setTags('');
		setIsNoteModalOpen(true);
	};

	const openEditModal = (note: Note) => {
		setSelectedNote(note);
		setTitle(note.title);
		setContent(note.content);
		setTags(note.tags.join(', '));
		setIsNoteModalOpen(true);
	};

	const closeNoteModal = () => {
		setIsNoteModalOpen(false);
		setSelectedNote(null);
		setTitle('');
		setContent('');
		setTags('');
	};

	const handleSubmitNote = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormLoading(true);

		try {
			const tagsArray = tags
				.split(',')
				.map((tag) => tag.trim())
				.filter((tag) => tag !== '');

			if (selectedNote) {
				await updateNote(selectedNote._id, { title, content, tags: tagsArray });
			} else {
				await createNote({ title, content, tags: tagsArray });
			}

			closeNoteModal();
		} catch (err: any) {
			alert(err.message);
		} finally {
			setFormLoading(false);
		}
	};

	const openDeleteModal = (note: Note) => {
		setSelectedNote(note);
		setIsDeleteModalOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!selectedNote) return;

		setDeleteLoading(true);
		try {
			await deleteNote(selectedNote._id);
			setIsDeleteModalOpen(false);
			setSelectedNote(null);
		} catch (err: any) {
			alert(err.message);
		} finally {
			setDeleteLoading(false);
		}
	};

	return (
		<DashboardLayout>
			<div className='mx-auto max-w-7xl px-6 py-12'>
				{/* Header */}
				<div className='flex items-center justify-between mb-8'>
					<div>
						<h1 className='text-3xl font-semibold'>Your Notes</h1>
						<p className='text-sm text-neutral-400 mt-1'>
							{notes.length} {notes.length === 1 ? 'note' : 'notes'}
						</p>
					</div>
					<button
						onClick={openCreateModal}
						className='rounded-md bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors'
					>
						+ New Note
					</button>
				</div>

				{/* Loading State */}
				{loading && <Loader />}

				{/* Error State */}
				{error && (
					<div className='rounded-md border border-red-900/50 bg-red-950/50 p-4 text-sm text-red-400 mb-6'>
						{error}
					</div>
				)}

				{/* Empty State */}
				{!loading && !error && notes.length === 0 && (
					<div className='text-center py-16'>
						<div className='text-6xl mb-4'>📝</div>
						<h3 className='text-xl font-semibold mb-2'>No notes yet</h3>
						<p className='text-neutral-400 mb-6'>
							Create your first note to get started
						</p>
						<button
							onClick={openCreateModal}
							className='rounded-md bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors'
						>
							Create Note
						</button>
					</div>
				)}

				{/* Notes Grid */}
				{!loading && !error && notes.length > 0 && (
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{notes.map((note) => (
							<div
								key={note._id}
								className='rounded-lg border border-neutral-800 bg-neutral-900/30 p-6 hover:border-neutral-700 transition-colors'
							>
								<h3 className='text-lg font-semibold mb-2 truncate'>
									{note.title}
								</h3>
								<p className='text-sm text-neutral-400 mb-4 line-clamp-3'>
									{note.content}
								</p>

								{/* Tags */}
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

								{/* Meta & Actions */}
								<div className='flex items-center justify-between pt-4 border-t border-neutral-800/50'>
									<span className='text-xs text-neutral-500'>
										{new Date(note.createdAt).toLocaleDateString()}
									</span>
									<div className='flex gap-2'>
										<button
											onClick={() => openEditModal(note)}
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
											onClick={() => openDeleteModal(note)}
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
						))}
					</div>
				)}
			</div>

			{/* Note Modal (Create/Edit) */}
			<Modal
				isOpen={isNoteModalOpen}
				onClose={closeNoteModal}
				title={selectedNote ? 'Edit Note' : 'Create New Note'}
			>
				<form onSubmit={handleSubmitNote} className='space-y-4'>
					<div>
						<label className='block text-sm font-medium mb-2'>Title</label>
						<input
							type='text'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700'
							placeholder='Enter note title'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium mb-2'>Content</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
							rows={8}
							className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700 resize-none'
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
							onChange={(e) => setTags(e.target.value)}
							className='w-full rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-700'
							placeholder='work, personal, ideas'
						/>
					</div>

					<button
						type='submit'
						disabled={formLoading}
						className='w-full rounded-md bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors disabled:opacity-50'
					>
						{formLoading
							? 'Saving...'
							: selectedNote
							? 'Update Note'
							: 'Create Note'}
					</button>
				</form>
			</Modal>

			{/* Delete Confirmation Modal */}
			<ConfirmModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleConfirmDelete}
				title='Delete Note'
				message={`Are you sure you want to delete "${selectedNote?.title}"? This action cannot be undone.`}
				confirmText='Delete'
				loading={deleteLoading}
			/>
		</DashboardLayout>
	);
};

export default Dashboard;
