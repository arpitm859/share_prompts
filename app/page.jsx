import React from 'react';
import Feed from '@components/Feed'

const Home = () => {
	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='head_text text-center'>
				Discover and Share
				<br className='ax-md:hidden' />
				<span className='orange_gradient'>AI-Powered Prompts</span>
			</h1>
            <p className="desc text-center">Give the text prompt here</p>

            {/* feed */}
            <Feed />
		</section>  
	);
};

export default Home;
