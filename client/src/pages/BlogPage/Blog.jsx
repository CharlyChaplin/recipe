import React, { useCallback, useEffect } from 'react';
import { ContentWrapper, MainWrapper, Overlay } from 'pages/pages.styled';
import bg from 'assets/img/blog/bg.jpg';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { BlogWrapper } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { blogGetPreviewBlogs } from 'redux/slices/blogSlice';


const BlogPage = () => {
	const { blogsPreview } = useSelector(state => state.blogReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		getPreview();

	}, []);

	const getPreview = useCallback(() => {
		dispatch(blogGetPreviewBlogs());
	}, [blogsPreview, dispatch]);

	return (
		<>
			<MainWrapper image={bg}>
				<BlogWrapper>
					<SectionHeader color={vars.whiteColor}>Блог</SectionHeader>
					<ContentWrapper>

						

					</ContentWrapper>
				</BlogWrapper>
				<Overlay />
			</MainWrapper>
		</>
	);
}

export default BlogPage;