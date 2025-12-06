import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Note } from '../types';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useNotes } from '../context/NotesContext';
import { useNoteForm } from '../hooks/useNoteForm';
import Modal from '../components/ui/Modal';
import ConfirmModal from '../components/ui/ConfirmModal';
import Loader from '../components/ui/Loader';
import NoteForm from '../components/notes/NoteForm';

const NoteDetail = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { fetchNoteById, updateNote, deleteNote } = useNotes();

	const [note, setNote] = useState<Note | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const { title, setTitle, content, setContent, tags, setTags, getFormData } =
		useNoteForm();

	useEffect(() => {
		loadNote();
	}, [id]);

	const loadNote = async () => {
		if (!id) return;

		try {
			setLoading(true);
			const data = await fetchNoteById(id);
			setNote(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const openEditModal = () => {
		if (!note) return;
		setTitle(note.title);
		setContent(note.content);
		setTags(note.tags.join(', '));
		setIsEditModalOpen(true);
	};

	const handleUpdateNote = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!note) return;

		setEditLoading(true);
		try {
			await updateNote(note._id, getFormData());
			const updatedNote = await fetchNoteById(note._id);
			setNote(updatedNote);
			setIsEditModalOpen(false);
		} catch (err) {
			// Error handled in context
		} finally {
			setEditLoading(false);
		}
	};

	const handleDeleteNote = async () => {
		if (!note) return;

		setDeleteLoading(true);
		try {
			await deleteNote(note._id);
			navigate('/dashboard');
		} catch (err) {
			setDeleteLoading(false);
		}
	};

	if (loading) {
		return (
			<DashboardLayout>
				<Loader />
			</DashboardLayout>
		);
	}

	if (error || !note) {
		return (
			<DashboardLayout>
				<div className='mx-auto max-w-4xl px-6 py-12'>
					<div className='text-center py-16'>
						<h2 className='text-2xl font-semibold mb-2'>Note not found</h2>
						<p className='text-neutral-400 mb-6'>
							{error || "The note you're looking for doesn't exist."}
						</p>
						<Link
							to='/dashboard'
							className='inline-block rounded-md bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950 hover:bg-neutral-200 transition-colors'
						>
							Back to Dashboard
						</Link>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className='mx-auto max-w-4xl px-6 py-12'>
				<Link
					to='/dashboard'
					className='inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-50 mb-6 transition-colors'
				>
					<svg
						className='w-4 h-4'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M15 19l-7-7 7-7'
						/>
					</svg>
					Back to Dashboard
				</Link>

				<article className='rounded-lg border border-neutral-800 bg-neutral-900/30 p-8'>
					<div className='flex items-start justify-between mb-6'>
						<div className='flex-1'>
							<h1 className='text-3xl font-semibold mb-2'>{note.title}</h1>
							<p className='text-sm text-neutral-500'>
								Created on {new Date(note.createdAt).toLocaleDateString()} at{' '}
								{new Date(note.createdAt).toLocaleTimeString()}
							</p>
							{note.createdAt !== note.updatedAt && (
								<p className='text-xs text-neutral-600 mt-1'>
									Last updated on{' '}
									{new Date(note.updatedAt).toLocaleDateString()}
								</p>
							)}
						</div>

						<div className='flex gap-2'>
							<button
								onClick={openEditModal}
								className='p-2 rounded-md border border-neutral-800 hover:bg-neutral-800 transition-colors'
								aria-label='Edit note'
							>
								<svg
									className='w-5 h-5 text-neutral-400'
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
								onClick={() => setIsDeleteModalOpen(true)}
								className='p-2 rounded-md border border-neutral-800 hover:bg-neutral-800 transition-colors'
								aria-label='Delete note'
							>
								<svg
									className='w-5 h-5 text-red-400'
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

					{note.tags.length > 0 && (
						<div className='flex flex-wrap gap-2 mb-6 pb-6 border-b border-neutral-800/50'>
							{note.tags.map((tag, index) => (
								<span
									key={index}
									className='px-3 py-1.5 text-sm rounded-md bg-neutral-800 text-neutral-300'
								>
									{tag}
								</span>
							))}
						</div>
					)}

					<div className='prose prose-invert max-w-none'>
						<p className='text-neutral-300 leading-relaxed whitespace-pre-wrap'>
							{note.content}
						</p>
					</div>
				</article>
			</div>

			<Modal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				title='Edit Note'
			>
				<NoteForm
					title={title}
					content={content}
					tags={tags}
					onTitleChange={setTitle}
					onContentChange={setContent}
					onTagsChange={setTags}
					onSubmit={handleUpdateNote}
					submitText='Update Note'
					loading={editLoading}
				/>
			</Modal>

			<ConfirmModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDeleteNote}
				title='Delete Note'
				message={`Are you sure you want to delete "${note.title}"? This action cannot be undone.`}
				confirmText='Delete'
				loading={deleteLoading}
			/>
		</DashboardLayout>
	);
};

export default NoteDetail;
