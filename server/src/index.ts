import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/api/health', (req, res) => {
	res.json({ success: true, message: 'NoteVault API is up and running' });
});

connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`);
	});
});
