import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import vars from "init/vars";
import { lighten, rgba } from "polished";
import { nanoid } from "nanoid";
import listMarker from 'assets/img/recipe/list-item.svg';


export const AboutWrapper = styled.div`
	display: flex;
	flex-direction: row;
	height: fit-content;
	width: fit-content;
	justify-content: center;
	align-items: center;
	align-self: center;
	padding: ${rem(1)};
	${adaptiveValue('border-radius', 10, 5)};
	${adaptiveValue('margin', 50, 10)};
	background-color: ${vars.dark};
	z-index: 0;
	position: relative;
	border: ${rem(1)} solid ${vars.dark};
`;

export const AboutContent = styled.div`
	${adaptiveValue('padding', 30, 15)};
	${adaptiveValue('border-radius', 10, 5)};
	/* background-color: ${lighten(.25, vars.darkGreen)}; */
	background-color: ${vars.adminLayer};
	position: relative;
	z-index: 1;
	border: ${rem(1)} solid ${vars.text};
	color: ${vars.text};
	max-width: ${rem(500)};
	
	hr {
		background-color: ${rgba(vars.text, .25)};
		height: ${rem(1)};
		width: 100%;
		${adaptiveValue('margin-bottom', 10, 7)};
	}
`;

export const AboutCaption = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	font-family: "Giger", sans-serif;
	${adaptiveValue('font-size', 45, 32)};
	letter-spacing: ${rem(1)};
	text-align: center;
	${adaptiveValue('margin-bottom', 60, 40)};
`;

export const AboutDescription = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	font-family: "RobotoRegular", sans-serif;
	${adaptiveValue('font-size', 22, 16)};
	letter-spacing: ${rem(1)};
	line-height: 1.2;
	${adaptiveValue('margin-bottom', 50, 40)};
	text-indent: ${rem(20)};
	text-align: justify;
	hyphens: auto;
`;

export const AboutTechnologies = styled(({ caption, items, ...props }) => (
	<div {...props}>
		<span>{caption}</span>
		<ul>
			{
				items?.map(item => {
					return (
						<li key={nanoid()}>{item}</li>
					)
				})
			}
		</ul>
	</div>
))`
	${adaptiveValue('margin-bottom', 50, 30)};
	
	span {
		display: block;
		font-family: "RalewayBold", sans-serif;
		${adaptiveValue('font-size', 24, 16)};
		letter-spacing: ${rem(1)};
		${adaptiveValue('margin-bottom', 20, 10)};
	}
	
	ul {
		font-family: "RobotoLight", sans-serif;
		${adaptiveValue('font-size', 22, 14)};
		
		li {
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;
			line-height: calc(24 / 16);
			background: url() left center no-repeat;
			background-size: ${rem(17)};
			${adaptiveValue('padding-left', 15, 7)};
			&::before {
				content: '';
				${adaptiveValue('margin-right', 15, 7)};
				border-radius: 50%;
				width: ${rem(2)};
				height: ${rem(2)};
				background-color: ${vars.text};
			}
			
			&:hover {
				color: ${vars.darkGreen};
				cursor: default;
				&::before {
					margin-right: 0;
					${adaptiveValue('margin-left', 15, 7)};
					background-color: transparent;
				}
				background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns='https://www.w3.org/2000/svg' width='17.103mm' height='13.229mm' version='1.1' viewBox='0 0 17.103 13.229'%3E%3Cg transform='translate(-116.94 -20.6)'%3E%3Cg transform='matrix(.26458 0 0 .26458 101.51 10.704)'%3E%3Ccircle cx='82.8' cy='62.4' r='22.5' fill='%23e9be76'/%3E%3Cpath d='m93.3 62.4c0 6.9-5.6 12.5-12.5 12.5' fill='%23e9be76'/%3E%3Cpath d='m83.3 87.4c-13.8 0-25-11.2-25-25s11.2-25 25-25 39.643 10.843 39.643 24.643-25.843 25.357-39.643 25.357zm0-45c-11 0-20 9-20 20s9 20 20 20 20-9 20-20-9-20-20-20z' fill='%238b987f'/%3E%3Cpath d='m83.3 77.4c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5c5.5 0 10-4.5 10-10 0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 8.3-6.7 15-15 15z' fill='%238b987f'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") left center no-repeat;
				background-position-x: ${rem(7)};
				background-size: ${rem(17)};
			}
		}
	}
`;

export const AboutSocials = styled(({ items, alt, ...props }) => (
	<div {...props}>
		{
			items?.map(item => {
				return (
					<a href={item.link} key={nanoid()} target="_blank">{item.icon}</a>
				)
			})
		}
	</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
	flex-wrap: wrap;
	${adaptiveValue('column-gap', 10, 5)};
	${adaptiveValue('row-gap', 15, 10)};
	
	a {
		display: block;
		${adaptiveValue('width', 25, 22)};
		${adaptiveValue('height', 25, 22)};
	}
	
	svg {
		width: 100%;
		height: 100%;
		transition: all 0.25s ease 0s;
		
		&:hover {
			fill: ${vars.darkGreen};
		}
	}
`;