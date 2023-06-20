import { Dispatch, SetStateAction } from 'react';
export {};

declare global {
	interface TPromptCardList {
		data: Array<Prompt>;
		handleTagClick: (tagName: string) => void;
	}
	interface TPromptCard {
		post: Prompt;
		handleEdit?: () => void;
		handleDelete?: () => void;
		handleTagClick?: (tagName: string) => void;
	}
	interface TForm {
		type: string;
		post: Prompt;
		setpost: Dispatch<SetStateAction<Prompt>>;
		submitting: boolean;
		handleSubmit;
	}
	interface TProfile {
		name: string;
		desc: string;
		data: Array<Prompt>;
		handleEdit: (post: Prompt) => void;
		handleDelete: (post: Prompt) => void;
	}
}
