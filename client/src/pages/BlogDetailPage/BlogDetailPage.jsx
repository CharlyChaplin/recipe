import React, { useCallback, useState, useEffect } from 'react';
import { MainWrapper } from 'pages/pages.styled';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/blog/bg.jpg';
import { useParams } from 'react-router-dom';
import { blogGetBlogById } from 'redux/slices/blogSlice';
import { BlogDetailTop, ContentWrapperChangedForBlogDetail } from './styled';


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


	console.log(blogData);

	return (
		<>
			<MainWrapper image={bg}>
				<ContentWrapperChangedForBlogDetail>
					<BlogDetailTop dateadd={blogData.dateadd} owner={blogData.name} />
				</ContentWrapperChangedForBlogDetail>
			</MainWrapper>
		</>
	);
}

export default BlogDetailPage;