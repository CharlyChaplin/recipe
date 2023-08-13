import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/blog/bg.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { blogGetBlogById } from 'redux/slices/blogSlice';
import { BlogDetailCaption, BlogDetailPhoto, BlogDetailTop, BlogTextWrapper, ContentWrapperChangedForBlogDetail, MainWrapperChangedForBlogDetail } from './styled';
import { paths } from 'routes/helper';
import { ButtonBtn, InnerWrapper } from 'pages/pages.styled';
import Spinner from 'components/Spinner/Spinner';


const BlogDetailPage = () => {
	const { blogData, loading } = useSelector(state => state.blogReducer);
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



	return (
		<>
			<MainWrapperChangedForBlogDetail image={bg}>

				<InnerWrapper>
					<ButtonBtn handleaction={() => navigate(paths.blog)} />
					<ContentWrapperChangedForBlogDetail>
						{
							loading
								? <Spinner height={100} />
								: <>
									<BlogDetailTop dateadd={blogData.dateadd} owner={blogData.name} />
									<BlogDetailPhoto image={blogData.photopreview} imageAltText={blogData.caption} />
									<BlogDetailCaption text={blogData.caption} />
									<BlogTextWrapper content={blogData.description} />
								</>
						}

					</ContentWrapperChangedForBlogDetail>
				</InnerWrapper>

			</MainWrapperChangedForBlogDetail>
		</>
	);
}

export default BlogDetailPage;