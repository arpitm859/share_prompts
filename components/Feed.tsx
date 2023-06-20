'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }: TPromptCardList) => {
	return (
		<div className='mt-16 prompt_layout'>
			{data.map((post: Prompt) => (
				<PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
			))}
		</div>
	);
};

const Feed = () => {
	const [allPosts, setAllPosts] = useState([]);
	// Search states
	const [searchText, setSearchText] = useState('');
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
	const [searchedResults, setSearchedResults] = useState([]);

	const fetchPosts = async () => {
		const response = await fetch('/api/prompt');
		const data = await response.json();
		console.log('data --------->', data);
		setAllPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const filterPrompts = (searchText: string) => {
		const regex: RegExp = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search
		return allPosts.filter(
			(item: Prompt) => regex.test(item.creater.username) || regex.test(item.tag) || regex.test(item.prompt)
		);
	};

	const handleSearchChange = (e: any) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		const id = setTimeout(() => {
			const searchResult = filterPrompts(e.target.value);
			setSearchedResults(searchResult);
		}, 500);
		// debounce method
		setSearchTimeout(id);
	};

	const handleTagClick = (tagName: string) => {
		setSearchText(tagName);
		const searchResult = filterPrompts(tagName);
		setSearchedResults(searchResult);
	};

	return (
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for a tag or a username'
					value={searchText}
					onChange={handleSearchChange}
					required
					className='search_input peer'
				/>
			</form>

			{/* All Prompts */}
			{searchText ? (
				<PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
			) : (
				<PromptCardList data={allPosts} handleTagClick={handleTagClick} />
			)}
		</section>
	);
};

export default Feed;
