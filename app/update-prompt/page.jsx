'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';


const editPrompt = () => {
	const [submitting, setsubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: ''
	});
	const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        const { prompt, tag } = data;
        setPost({ prompt, tag });
      }

      if(promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
		e.preventDefault();
		setsubmitting(true);

        if(!promptId) return alert('Prompt ID not found');

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					prompt : post.prompt,
					tag: post.tag,
				})
			})
			if(response.ok) {
				router.push('/')
			}
		} catch (error) {
			console.log(error)
		} finally {
			setsubmitting(false);
		}
	}

  return (
    <Form
		  type="Edit"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
  )
}

export default editPrompt