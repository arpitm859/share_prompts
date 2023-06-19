import Prompt from '@models/prompt';
import { connectToDb } from '@utils/db';

export const GET = async () => {
	try {
		await connectToDb();
		const allPrompts = await Prompt.find({}).populate('creater');
		return new Response(JSON.stringify(allPrompts), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Failed to fetch prompts', { status: 500 });
	}
};
