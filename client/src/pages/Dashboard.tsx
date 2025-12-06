import { useState, useEffect } from 'react';
import type { Note } from '../types';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useNotes } from '../context/NotesContext';
import { useNoteForm } from '../hooks/useNoteForm';
import Modal from '../components/ui/Modal';
import ConfirmModal from '../components/ui/ConfirmModal';
import Loader from '../components/ui/Loader';
import NoteCard from '../components/notes/NoteCard';
import NoteForm from '../components/notes/NoteForm';

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

	const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedNote, setSelectedNote] = useState<Note | null>(null);
	const [formLoading, setFormLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const {
		title,
		setTitle,
		content,
		setContent,
		tags,
		setTags,
		reset,
		getFormData,
	} = useNoteForm();

	useEffect(() => {
		fetchNotes();
	}, []);

	const openCreateModal = () => {
		setSelectedNote(null);
		reset();
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
		reset();
	};

	const handleSubmitNote = async (e: React.FormEvent) => {
		e.preventDefault();
		setFormLoading(true);

		try {
			const formData = getFormData();
			if (selectedNote) {
				await updateNote(selectedNote._id, formData);
			} else {
				await createNote(formData);
			}
			closeNoteModal();
		} catch (err) {
			// Error already handled in context
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
		} catch (err) {
			// Error already handled in context
		} finally {
			setDeleteLoading(false);
		}
	};

	return (
		<DashboardLayout>
			<div className='mx-auto max-w-7xl px-6 py-12'>
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

				{loading && <Loader />}

				{error && (
					<div className='rounded-md border border-red-900/50 bg-red-950/50 p-4 text-sm text-red-400 mb-6'>
						{error}
					</div>
				)}

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

				{!loading && !error && notes.length > 0 && (
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{notes.map((note) => (
							<NoteCard
								key={note._id}
								note={note}
								onEdit={openEditModal}
								onDelete={openDeleteModal}
							/>
						))}
					</div>
				)}
			</div>

			<Modal
				isOpen={isNoteModalOpen}
				onClose={closeNoteModal}
				title={selectedNote ? 'Edit Note' : 'Create New Note'}
			>
				<NoteForm
					title={title}
					content={content}
					tags={tags}
					onTitleChange={setTitle}
					onContentChange={setContent}
					onTagsChange={setTags}
					onSubmit={handleSubmitNote}
					submitText={selectedNote ? 'Update Note' : 'Create Note'}
					loading={formLoading}
				/>
			</Modal>

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
