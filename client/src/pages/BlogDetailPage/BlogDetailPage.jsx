import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/blog/bg.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { blogGetBlog, clearBlogData } from 'redux/slices/blogSlice';
import { BlogDetailCaption, BlogDetailPhoto, BlogDetailTop, BlogTextWrapper, ContentWrapperChangedForBlogDetail, MainWrapperChangedForBlogDetail } from './styled';
import { paths } from 'routes/helper';
import { ButtonBtn, InnerWrapper } from 'pages/pages.styled';
import Spinner from 'components/Spinner/Spinner';
import NoData from 'components/NoData/NoData';


const BlogDetailPage = () => {
	const { blogData, loading } = useSelector(state => state.blogReducer);
	const { name } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		getData();

		return () => dispatch(clearBlogData());
	}, []);

	const getData = useCallback(() => {
		dispatch(blogGetBlog({blogCaption: name}));
	}, [dispatch, blogData]);


	return (
		<>
			<MainWrapperChangedForBlogDetail image={bg}>

				<InnerWrapper>
					<ButtonBtn handleaction={() => navigate(-1)} />
					<ContentWrapperChangedForBlogDetail>
						{
							loading
								? <Spinner height={100} />
								: Object.values(blogData).length
									? <>
										<BlogDetailTop dateadd={blogData.dateadd} owner={blogData.name} />
										<BlogDetailPhoto image={blogData.photopreview} imageAltText={blogData.caption} />
										<BlogDetailCaption text={blogData.caption} />
										<BlogTextWrapper content={blogData.description} />
									</>
									: <NoData text="Нет такого блога" />
						}

					</ContentWrapperChangedForBlogDetail>
				</InnerWrapper>

			</MainWrapperChangedForBlogDetail>
		</>
	);
}

export default BlogDetailPage;