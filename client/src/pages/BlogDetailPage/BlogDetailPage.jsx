import React, { useCallback, useState, useEffect } from 'react';
import { MainWrapper } from 'pages/pages.styled';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/blog/bg.jpg';
import { useParams } from 'react-router-dom';
import { blogGetBlogById } from 'redux/slices/blogSlice';


const BlogDetailPage = () => {
	const { blogData } = useSelector(state => state.blogReducer);
	const [receivedData, setReceivedData] = useState();
	const { id } = useParams();
	const dispatch = useDispatch();


	useEffect(() => {
		getData();


	}, []);

	const getData = useCallback(() => {
		dispatch(blogGetBlogById(id));
	}, [dispatch, blogData]);


	return (
		<>
			<MainWrapper image={bg}>
				Blog Detail PAGE
			</MainWrapper>
		</>
	);
}

export default BlogDetailPage;