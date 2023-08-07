import React, { useCallback, useState } from 'react';
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

	const getBlog = useCallback(() => {
		if (Object.keys(blogData).length) {
			setReceivedData(blogData);
			localStorage.setItem('blogEdit', JSON.stringify(blogData));
		} else if (Array.from(blogData).length === 0) {
			setReceivedData(JSON.parse(localStorage.getItem('blogEdit') || null));
		}
	}, [blogData]);


	return (
		<>
			<MainWrapper>

				

			</MainWrapper>
		</>
	);
}

export default BlogEditPage;