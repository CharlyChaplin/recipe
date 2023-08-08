import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/blog/bg.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { blogGetBlogById } from 'redux/slices/blogSlice';
import { BlogDetailCaption, BlogDetailPhoto, BlogDetailTop, BlogTextWrapper, BlogWrapper, ContentWrapperChangedForBlogDetail, MainWrapperChangedForBlogDetail } from './styled';
import { paths } from 'routes/helper';
import { ButtonBtn } from 'pages/pages.styled';


const BlogDetailPage = () => {
	const { blogData } = useSelector(state => state.blogReducer);
	const [receivedData, setReceivedData] = useState();
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		getData();


	}, []);

	const getData = useCallback(() => {
		dispatch(blogGetBlogById(id));
	}, [dispatch, blogData]);

	function backAction() {
		navigate(paths.blog);
	}

	console.log(blogData);

	return (
		<>
			<MainWrapperChangedForBlogDetail image={bg}>

				<BlogWrapper>
					<ButtonBtn handleaction={backAction} />
					<ContentWrapperChangedForBlogDetail>
						<BlogDetailTop dateadd={blogData.dateadd} owner={blogData.name} />
						<BlogDetailPhoto image={blogData.photopreview} imageAltText={blogData.caption} />
						<BlogDetailCaption text={blogData.caption} />
						<BlogTextWrapper content={blogData.description} />
					</ContentWrapperChangedForBlogDetail>
				</BlogWrapper>

			</MainWrapperChangedForBlogDetail>
		</>
	);
}

export default BlogDetailPage;