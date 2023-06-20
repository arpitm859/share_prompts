import mongoose, { Schema, model, models } from 'mongoose';
import User from './user';

const PromptSchema = new Schema<TPrompt>({
	creater: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User.modelName,
		required: true,
	},
	prompt: {
		type: 'String',
		required: [true, 'Prompt is required'],
	},
	tag: {
		type: 'String',
		required: [true, 'Tag is required'],
	},
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
