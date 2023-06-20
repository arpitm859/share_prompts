export {};

declare global {
	interface User {
		readonly _id: string;
		email: string;
		username: string;
		image: string;
	}

	interface Prompt {
		readonly _id: string;
		creater: User;
		prompt: string;
		tag: string;
	}
}
