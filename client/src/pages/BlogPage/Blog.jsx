import React, { useCallback, useEffect } from 'react';
import { ContentPaddingTop, ContentWrapper, InnerWrapper, MainWrapper, PreviewBlogItem } from 'pages/pages.styled';
import bg from 'assets/img/blog/bg.jpg';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { useDispatch, useSelector } from 'react-redux';
import { blogGetPreviewBlogs, clearBlogData } from 'redux/slices/blogSlice';
import { nanoid } from 'nanoid';
import Spinner from 'components/Spinner/Spinner';
import NoData from 'components/NoData/NoData';


const BlogPage = () => {
	const { blogsPreview, loading } = useSelector(state => state.blogReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		getPreview();

		dispatch(clearBlogData());
	}, []);

	const getPreview = useCallback(() => {
		dispatch(blogGetPreviewBlogs());
	}, [blogsPreview, dispatch]);



	return (
		<>
			<MainWrapper image={bg}>

				<InnerWrapper>
					<ContentPaddingTop />
					<SectionHeader color={vars.whiteColor}>Блог</SectionHeader>

					{
						loading
							? <ContentWrapper spiner><Spinner height={100} /></ContentWrapper>
							: <>
								{
									blogsPreview.length > 0
										? <ContentWrapper>
											{
												blogsPreview.map(preview => (
													<PreviewBlogItem
														key={nanoid()}
														url={`/blog/${preview.caption_lat}`}
														owner={preview.name}
														dateadd={preview.dateadd}
														image={preview.photopreview}
														imageAlt={preview.caption}
														caption={preview.caption}
														description={preview.description}
													/>
												))
											}
										</ContentWrapper>
										: <ContentWrapper spiner><NoData /></ContentWrapper>
								}
							</>


					}
				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default BlogPage;