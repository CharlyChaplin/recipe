import React, { useCallback, useEffect } from 'react';
import { ContentWrapper, MainWrapper, Overlay, PreviewBlogItem } from 'pages/pages.styled';
import bg from 'assets/img/blog/bg.jpg';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { BlogWrapper } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { blogGetPreviewBlogs } from 'redux/slices/blogSlice';
import { nanoid } from 'nanoid';


const BlogPage = () => {
	const { blogsPreview } = useSelector(state => state.blogReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		getPreview();

	}, []);

	const getPreview = useCallback(() => {
		dispatch(blogGetPreviewBlogs());
	}, [blogsPreview, dispatch]);

	console.log(blogsPreview);

	return (
		<>
			<MainWrapper image={bg}>

				<BlogWrapper>
					<SectionHeader color={vars.whiteColor}>Блог</SectionHeader>
					<ContentWrapper>

						{
							blogsPreview.length &&
							blogsPreview.map(preview => (
								<PreviewBlogItem
									key={nanoid()}
									url="blogedit"
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
				</BlogWrapper>
				<Overlay />
			</MainWrapper>
		</>
	);
}

export default BlogPage;