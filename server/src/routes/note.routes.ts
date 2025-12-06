import { Router } from 'express';
import {
	createNote,
	getNotes,
	getNoteById,
	updateNote,
	deleteNote,
} from '../controllers/note.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { createNoteSchema, updateNoteSchema } from '../schemas/note.schema.js';

const router = Router();

router.use(authenticate);

router.post('/', validate(createNoteSchema), createNote);

router.get('/', getNotes);

router.get('/:id', getNoteById);

router.put('/:id', validate(updateNoteSchema), updateNote);

router.delete('/:id', deleteNote);

export default router;
