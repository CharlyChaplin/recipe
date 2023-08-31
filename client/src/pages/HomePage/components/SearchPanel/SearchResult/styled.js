import { styled } from "styled-components"
import vars from "init/vars";
import { adaptiveValue, rem } from "init/mixins";
import { rgba } from "polished";




export const SearchResult = styled.div`
	background-color: ${vars.searchBackgroundColor};
`;

export const SearchResultWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(28)};
	padding: ${rem(25)} ${rem(30)};
`;

export const SearchResultBlock = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${rem(15)};
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
	border-radius: ${rem(5)};
	padding: ${rem(10)};
	max-width: ${rem(270)};
	
	span {
		text-transform: uppercase;
		text-decoration: underline;
	}
	
`;

export const SearchResultFindItemList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: ${rem(10)};
`;

export const SearchResultItem = styled(({ image, text, ...props }) => (
	<li {...props}>
		<section>
			<div><img src={image} alt="pic" /></div>
			<div>{text}</div>
		</section>
	</li>
))`
	background-color: ${vars.whiteColor};
	cursor: pointer;
	padding: ${rem(7)};
	transition: all 0.25s ease 0s;
	color: ${vars.text};
	border-radius: ${rem(5)};
	display: flex;
	flex-direction: row;
	border: ${rem(1)} solid ${vars.lightGreen};
	
	&:hover {
		background-color: ${rgba(vars.lightGreen, .15)};
		border-radius: ${rem(5)};
	}
	
	section {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: ${rem(15)};
		
		div {
			&:nth-child(1) {
				width: ${rem(40)};
				height: ${rem(40)};
				position: relative;
				
				img {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					object-fit: cover;
				}
			}
			&:nth-child(2) {
				white-space: nowrap;
				font-family: "RalewayRegular", sans-serif;
				${adaptiveValue("font-size", 24, 24)};
			}
		}
	}
`;