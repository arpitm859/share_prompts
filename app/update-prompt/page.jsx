'use client';

import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const UpdatePrompt = () => {
	const [submitting, setsubmitting] = useState(false);
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');
	const [post, setpost] = useState({
		prompt: '',
		tag: '',
	});
	const router = useRouter();
	const updatePrompt = async (e) => {
		e.preventDefault();
		setsubmitting(true);

		if (!promptId) alert('Prompt Id not present');
		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt: post.prompt,
					tag: post.tag,
				}),
			});
			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(error);
		} finally {
			setsubmitting(false);
		}
	};

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();
			console.log('data ------->', data);
			setpost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};
		if (promptId) getPromptDetails();
	}, [promptId]);

	return <Form type='Update' post={post} setpost={setpost} submitting={submitting} handleSubmit={updatePrompt} />;
};

export default UpdatePrompt;
