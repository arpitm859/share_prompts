import { Document } from 'mongoose';
export {};

declare global {
	interface TUser extends Document {
		email: string;
		username: string;
		image?: string;
	}

	interface TPrompt extends Document {
		creater: mongoose.Schema.Types.ObjectId;
		prompt: string;
		tag: string;
	}
}
