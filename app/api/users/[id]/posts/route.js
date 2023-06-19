import Prompt from '@models/prompt';
import { connectToDb } from '@utils/db';

export const GET = async (req, { params }) => {
	try {
		await connectToDb();
		const allPosts = await Prompt.find({ creater: params.id }).populate('creater');
		return new Response(JSON.stringify(allPosts), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Failed to fetch posts', { status: 500 });
	}
};
