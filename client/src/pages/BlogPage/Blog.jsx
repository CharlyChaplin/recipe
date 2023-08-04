import React from 'react';
import { MainWrapper, Overlay } from 'pages/pages.styled';
import bg from 'assets/img/blog/bg.jpg';


const BlogPage = () => {
	return (
		<>
			<MainWrapper image={bg}>
				Blog
				<Overlay />
			</MainWrapper>
		</>
	);
}

export default BlogPage;