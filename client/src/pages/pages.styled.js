import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";
import { Link } from "react-router-dom";


export const MainWrapper = styled(({ children, image, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	height: 100%;
	padding: ${rem(55)};
	border-radius: ${rem(30)};
	overflow: hidden;
	position: relative;
	z-index: 0;
	background: url(${({ image }) => image ? image : null}) 0 0 no-repeat;
	background-size: cover;
	background-repeat: no-repeat;
	color: ${vars.whiteColor};
`;

export const Overlay = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: ${rgba(vars.overlay, .85)};
	z-index: -1;
`;

export const ContentWrapper = styled(({ children, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	box-shadow: ${rem(0)} ${rem(0)} ${rem(2)} ${rem(1)} ${vars.darkGreen};
	background-color: ${vars.adminLayer};
	${adaptiveValue("padding-top", 50, 30)};
	${adaptiveValue("padding-bottom", 50, 30)};
	${adaptiveValue("padding-left", 60, 40)};
	${adaptiveValue("padding-right", 60, 40)};

	${adaptiveValue("border-radius", 20, 10)};
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(${rem(150)}, 1fr));
	${adaptiveValue("gap", 50, 30)};
	font-family: "RalewayRegular", sans-serif;
`;

export const PreviewCategoryRecipeItem = styled(({ children, url, image, imageAlt, title, ...props }) => (
	<Link to={url} {...props}>
		<div>
			<img src={image} alt={imageAlt} />
		</div>
		<div>
			<span>{title}</span>
		</div>
		{children}
	</Link>
))`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
	color: ${vars.text};
	&:hover {
		>:nth-child(1) {
			box-shadow: ${rem(2)} ${rem(4)} ${rem(3)} ${rem(0)} ${rgba(vars.blackColor, .3)};
		}
		>:nth-child(2) {
			&::after {
				opacity: 1;
				width: 100%;
			}
		}
	}

	>:nth-child(1) {
		width: ${rem(150)};
		height: ${rem(120)};
		border-radius: ${rem(10)};
		overflow: hidden;
		margin-bottom: ${rem(13)};
		border: 2px solid ${vars.lightGreen};
		box-shadow: ${rem(1)} ${rem(1)} ${rem(3)} ${rem(0)} ${rgba(vars.blackColor, 3)};
		transition: all 0.2s ease 0s;
		position: relative;
		img {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			object-fit: cover;
			z-index: unset;
			border-radius: ${rem(10)};
		}
	}
	>:nth-child(2) {
		letter-spacing: ${rem(2)};
		font-family: "RalewayRegular", sans-serif;
		font-size: ${rem(24)};
		position: relative;
		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: ${rem(-5)};
			width: 0;
			height: ${rem(1)};
			background-color: ${rgba(vars.text, .5)};
			transition: all 0.2s ease 0s;
			opacity: 0;
		}
	}
`;

export const PreviewBlogItem = styled(({ children, url, dateadd, owner, image, imageAlt, caption, description, ...props}) => (
	<Link to={url} {...props}>
		<header>
			<time>{dateadd}</time>
			<span></span>
			<div>{owner}</div>
		</header>
		<article>
			<div>
				<img src={image} alt={imageAlt} />
			</div>
			<div>
				<aside>
					<p>{caption}</p>
					<span>{description}</span>
				</aside>
			</div>
		</article>
	</Link>
))`
	
`;