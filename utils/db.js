import mongoose from 'mongoose';
let isConnected = false;

export const connectToDb = async () => {
	mongoose.set('strictQuery', true);
	if (isConnected) {
		console.log('Mongoose is already connected');
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'sharePrompt',
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		isConnected = true;
		console.log('MongoDb successfully connected');
	} catch (error) {
		console.log(error);
	}
};
