import { Request, Response } from 'express';
import Note from '../models/note.model.js';

export const createNote = async (req: Request, res: Response) => {
	try {
		const { title, content, tags } = req.body;
		const userId = req.user?._id;

		const note = await Note.create({
			title,
			content,
			tags,
			userId,
		});

		res.status(201).json({
			success: true,
			message: 'Note created successfully',
			data: note,
		});
	} catch (error) {
		console.error('Create note error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error while creating note',
		});
	}
};

export const getNotes = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;

		const notes = await Note.find({ userId }).sort({ createdAt: -1 });

		res.status(200).json({
			success: true,
			data: notes,
			count: notes.length,
		});
	} catch (error) {
		console.error('Get notes error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error while fetching notes',
		});
	}
};

export const getNoteById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req.user?._id;

		const note = await Note.findOne({ _id: id, userId });

		if (!note) {
			return res.status(404).json({
				success: false,
				message: 'Note not found',
			});
		}

		res.status(200).json({
			success: true,
			data: note,
		});
	} catch (error) {
		console.error('Get note error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error while fetching note',
		});
	}
};

export const updateNote = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req.user?._id;
		const updates = req.body;

		const note = await Note.findOneAndUpdate({ _id: id, userId }, updates, {
			new: true,
			runValidators: true,
		});

		if (!note) {
			return res.status(404).json({
				success: false,
				message: 'Note not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Note updated successfully',
			data: note,
		});
	} catch (error) {
		console.error('Update note error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error while updating note',
		});
	}
};

export const deleteNote = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const userId = req.user?._id;

		const note = await Note.findOneAndDelete({ _id: id, userId });

		if (!note) {
			return res.status(404).json({
				success: false,
				message: 'Note not found',
			});
		}

		res.status(200).json({
			success: true,
			message: 'Note deleted successfully',
		});
	} catch (error) {
		console.error('Delete note error:', error);
		res.status(500).json({
			success: false,
			message: 'Server error while deleting note',
		});
	}
};
