import React, { useCallback, useEffect } from 'react';
import { ContentPaddingTop, ContentWrapper, InnerWrapper, MainWrapper, PreviewBlogItem } from 'pages/pages.styled';
import bg from 'assets/img/blog/bg.jpg';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { useDispatch, useSelector } from 'react-redux';
import { blogGetPreviewBlogs } from 'redux/slices/blogSlice';
import { nanoid } from 'nanoid';
import Spinner from 'components/Spinner/Spinner';


const BlogPage = () => {
	const { blogsPreview, loading } = useSelector(state => state.blogReducer);
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

				<InnerWrapper>
					<ContentPaddingTop />
					<SectionHeader color={vars.whiteColor}>Блог</SectionHeader>
					<ContentWrapper>

						{
							!loading
								?
								blogsPreview.length > 0 &&
								blogsPreview.map(preview => (
									<PreviewBlogItem
										key={nanoid()}
										url={`/blog/${preview.id}`}
										owner={preview.name}
										dateadd={preview.dateadd}
										image={preview.photopreview}
										imageAlt={preview.caption}
										caption={preview.caption}
										description={preview.description}
									/>
								))
								: <Spinner height={100} />
						}


					</ContentWrapper>
				</InnerWrapper>
			</MainWrapper>
		</>
	);
}

export default BlogPage;