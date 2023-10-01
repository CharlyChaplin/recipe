import { styled } from "styled-components"
import vars from "init/vars";
import { adaptiveValue, rem, textclip } from "init/mixins";
import { rgba } from "polished";




export const SearchResultComponent = styled.div`
	background-color: ${vars.searchBackgroundColor};
	hr {
		height: ${rem(1)};
		background-color: ${rgba(vars.whiteColor, .25)};
	}
`;

export const SearchResultWrapper = styled.div`
	display: flex;
	flex-direction: column;
	${adaptiveValue('gap', 28, 15)};
	
	${adaptiveValue('padding-top', 25, 20)};
	${adaptiveValue('padding-bottom', 25, 20)};
	${adaptiveValue('padding-left', 30, 6)};
	${adaptiveValue('padding-right', 30, 6)};
`;

export const SearchResultBlock = styled.div`
	display: flex;
	flex-direction: column;
	${adaptiveValue('gap', 15, 10)};
`;

export const SearchResultCategoryCaption = styled(({ categoryName, ...props }) => (
	<div {...props}>
		<span>{categoryName}</span>
	</div>
))`
	background-color: ${rgba(vars.lightGreen, .35)};
	color: ${vars.text};
	border: ${rem(1)} solid ${rgba(vars.whiteColor, .5)};
	box-shadow: ${rem(0)} ${rem(0)} ${rem(10)} ${rem(0)} ${rgba(vars.whiteColor, .3)};
	${adaptiveValue('border-radius', 10, 5)};
	${adaptiveValue('padding', 10, 5)};
	max-width: ${rem(270)};
	
	span {
		text-transform: uppercase;
		text-decoration: underline;
	}
	
`;

export const SearchResultFindItemList = styled.ul`
	display: flex;
	flex-direction: column;
	${adaptiveValue('gap', 10, 5)};
`;

export const SearchResultItem = styled(({ image, description, link, ...props }) => (
	<li {...props}>
		<a href={link}>
			<div><img src={image} alt="pic" /></div>
			<div>{description}</div>
		</a>
	</li>
))`
	background-color: ${vars.whiteColor};
	cursor: pointer;
	transition: all 0.25s ease 0s;
	color: ${vars.text};
	${adaptiveValue('padding', 7, 3)};
	
	${adaptiveValue('border-radius', 5, 3)};
	display: flex;
	flex-direction: row;
	border: ${rem(1)} solid ${vars.lightGreen};
	
	&:hover {
		background-color: ${rgba(vars.lightGreen, .15)};
		border-radius: ${rem(0)};
	}
	
	a {
		display: flex;
		width: 100%;
		flex-direction: row;
		align-items: center;
		${adaptiveValue('gap', 15, 7)};
		color: ${vars.text};
		overflow: hidden;
		
		div {
			// первый элемент в контейнере это рисунок
			&:nth-child(1) {
				flex-shrink: 0;
				flex-grow: 0;
				${adaptiveValue('width', 40, 30)};
				${adaptiveValue('height', 40, 30)};
				position: relative;
				border: ${rem(1)} solid ${vars.lightGreen};
				${adaptiveValue('border-radius', 5, 3)};
				overflow: hidden;
				
				img {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					object-fit: cover;
				}
			}
			// второй элемент в контейнере это описание
			&:nth-child(2) {
				white-space: nowrap;
				font-family: "RalewayRegular", sans-serif;
				${adaptiveValue("font-size", 24, 14)};
				width: 100%;
			}
		}
	}
`;