import { Schema, model, models } from 'mongoose';

const userSchema = new Schema<TUser>({
	username: {
		type: String,
		required: [true, 'Email is required'],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
		],
	},
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required!'],
	},
	image: {
		type: String,
	},
});

const User = models.User || model<TUser>('User', userSchema);

export default User;
