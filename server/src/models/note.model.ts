import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
	title: string;
	content: string;
	userId: mongoose.Types.ObjectId;
	tags?: string[];
	createdAt: Date;
	updatedAt: Date;
}

const noteSchema = new Schema<INote>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		tags: {
			type: [String],
			default: [],
		},
	},
	{
		timestamps: true,
	}
);

noteSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<INote>('Note', noteSchema);
