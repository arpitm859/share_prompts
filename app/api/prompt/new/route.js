import Prompt from '@models/prompt';
import { connectToDb } from '@utils/db';

export const POST = async (req, res) => {
	const { userId, prompt, tag } = await req.json();
	try {
		await connectToDb();
		const newPrompt = new Prompt({
			creater: userId,
			prompt,
			tag,
		});
		await newPrompt.save();
		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		console.log(error);
		return new Response('Failed to create a prompt', { status: 500 });
	}
};
