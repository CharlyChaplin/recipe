import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import { BlogEditTextWrapper, BlogEditTop, ContentWrapperChangedForBlogEdit } from "pages/BlogEditPage/styled";
import { AddPhotoBlock } from "pages/pages.styled";


export const ContentWrapperChangedForAddBlog = styled(ContentWrapperChangedForBlogEdit)`
	max-width: ${rem(700)};
	width: 100%;
	${adaptiveValue("padding", 35, 20)};
	${adaptiveValue("padding-left", 35, 5)};
	${adaptiveValue("padding-right", 35, 5)};
	margin: 0;
`;

export const BlogEditTopChangedForAddBlog = styled(BlogEditTop)`
	input {
		text-align: center;
	}
`;

export const AddPhotoBlockChangedForAddBlog = styled(AddPhotoBlock)`
	${adaptiveValue('height', 175, 150)};
`;

export const BlogEditTextWrapperForAdd = styled(BlogEditTextWrapper)`
	article {
		display: flex;
		flex-direction: column;
		gap: ${rem(15)};
		text-indent: 0;
	}
`;