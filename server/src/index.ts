import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import noteRoutes from './routes/note.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', (req, res) => {
	res.json({ success: true, message: 'NoteVault API is up and running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/notes/', noteRoutes);

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
});
