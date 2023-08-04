import React, { useState } from 'react';
import { MainWrapper } from 'pages/pages.styled';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


const BlogEditPage = () => {
	const { blogData } = useSelector(state => state.blogReducer);
	const [receivedData, setReceivedData] = useState();

	useEffect(() => {
		getBlog();

		return () => localStorage.removeItem('blogEdit');
	}, [blogData]);

	function getBlog() {
		if (Object.keys(blogData).length) {
			setReceivedData(blogData);
			localStorage.setItem('blogEdit', JSON.stringify(blogData));
		} else if (Array.from(blogData).length === 0) {
			setReceivedData(JSON.parse(localStorage.getItem('blogEdit') || null));
		}
	};


	return (
		<>
			<MainWrapper>

				{/* <ContentWrapper>
					
				</ContentWrapper> */}
			</MainWrapper>
		</>
	);
}

export default BlogEditPage;