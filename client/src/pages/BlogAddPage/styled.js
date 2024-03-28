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
		
		h1, h2, h3, h4, h5, h6 {
			font-weight: revert;
		}
		h1 {
			font-size: ${rem(32)};
		}
		h2 {
			font-size: ${rem(24)};
		}
		h3 {
			font-size: ${rem(19)};
		}
		h4 {
			font-size: ${rem(16)};
		}
		h5 {
			font-size: ${rem(14)};
		}
		h6 {
			font-size: ${rem(12)};
		}
	}
`;