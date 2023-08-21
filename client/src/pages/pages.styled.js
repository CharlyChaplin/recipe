import { styled } from "styled-components";
import { adaptiveValue, em, rem, textclip } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";


export const MainWrapper = styled(({ children, image, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	display: grid;
	justify-items: center;
	width: 100%;
	height: 100%;
	/* overflow: auto; */
	overflow: hidden;
	/* padding: ${rem(55)}; */
	border-radius: ${rem(30)};
	z-index: 0;
	background: url(${({ image }) => image ? image : null}) 0 0 no-repeat;
	background-size: cover;
	background-repeat: no-repeat;
	color: ${vars.whiteColor};
	position: relative;
	
	&::after {
		display: block;
		align-content: center;
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: ${rgba(vars.overlay, .85)};
		z-index: -1;
	}
`;

export const InnerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${rem(50)};
	overflow: auto;
	width: 100%;
	padding: ${rem(30)} 0 ${rem(40)} 0;
`;

export const ContentWrapper = styled(({ children, spiner, ...props }) => (
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
	display: ${(({ spiner }) => spiner ? 'block' : 'grid')};
	grid-template-columns: repeat(auto-fit, minmax(${rem(420)}, 1fr));
	grid-auto-flow: row;
	justify-items: center;
	gap: ${rem(50)};
	font-family: "RalewayRegular", sans-serif;
	max-width: ${rem(1050)};
	color: ${vars.text};
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

export const PreviewBlogItem = styled(({ children, url, owner, dateadd, image, imageAlt, caption, description, ...props }) => (
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
	max-width: ${rem(420)};
	color: ${vars.text};
	display: flex;
	flex-direction: column;
	&:hover {
		header {
			color: ${vars.text};
		}
		article {
			&::after {
				background-color: ${rgba(vars.dark, .5)};
			}
			div:nth-child(1) {
				box-shadow: ${rem(2)} ${rem(4)} ${rem(3)} ${rem(0)} ${rgba(vars.blackColor, 0.3)};
			}
		}
		aside p::after {
			background-color: ${rgba(vars.dark, .5)};
		}
		
	}
	header {
		display: flex;
		flex-direction: row;
		font-family: "Roboto", sans-serif;
		font-size: ${rem(16)};
		color: ${rgba(vars.text, .5)};
		line-height: calc(18.75 / 16);
		${adaptiveValue("margin-left", 15, 10, 1, 1390, 479.99)};
		${adaptiveValue("margin-bottom", 10, 5)};
		transition: all 0.25s ease 0s;
		span {
			margin: 0 ${rem(10)};
			height: ${rem(16)};
			width: ${rem(1)};
			background-color: ${vars.text};
		}
	}
	article {
		cursor: pointer;
		height: 100%;
		div:nth-child(1) {
			float: left;
			width: ${rem(170)};
			height: ${rem(136)};
			${adaptiveValue("min-width", 170, 100)};
			${adaptiveValue("min-height", 136, 70)};
			border-radius: ${rem(10)};
			overflow: hidden;
			margin-right: ${rem(20)};
			margin-bottom: ${rem(5)};
			margin-left: ${rem(15)};
			${adaptiveValue("margin-top", 15, 25)};
			transition: all 0.2s ease 0s;
			box-shadow: ${rem(1)} ${rem(1)} ${rem(2)} ${rem(0)} ${rgba(vars.blackColor, .3)};
			border: 2px solid ${rgba(vars.buttonBottomColor, .7)};
			position: relative;
			img {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				z-index: unset;
				border-radius: unset;
			}
			@media (max-width: ${em(479.98)}) {
				margin-right: 0;
				margin-bottom: ${rem(25)};
				align-self: center;
				margin-left: 50%;
				transform: translate(-50%, 0%);
			}
		}
		div:nth-child(2) {
			height: 100%;
		}
		aside {
			height: 100%;
			padding: ${rem(15)};
			text-align: justify;
			background: ${rgba(vars.whiteColor, .25)};
			border: 1px solid ${rgba(vars.dark, .15)};
			border-radius: ${rem(15)};
			transition: all 0.25s ease 0s;
			&:hover {
				border: ${rem(1)} solid ${vars.accent};
			}
			span {
				font-size: ${rem(16)};
				font-family: "Roboto", sans-serif;
				line-height: 140%;
				hyphens: auto;
				text-align: justify;
			}
			p {
				font-family: "Raleway", sans-serif;
				font-weight: 600;
				${adaptiveValue("font-size", 24, 20)};
				letter-spacing: ${rem(2)};
				color: ${vars.text};
				margin-bottom: ${rem(24)};
				width: fit-content;
				margin-left: 75%;
				transform: translate(-50%, 0%);
				position: relative;
				&::after {
					content: '';
					transition: all 0.25s ease 0s;
					position: absolute;
					bottom: ${rem(-5)};
					left: 0;
					width: 100%;
					height: ${rem(2)};
					border-radius: ${rem(2)};
					background-color: ${rgba(vars.dark, .25)};
				}
				${adaptiveValue("margin-top", 150, 150, 1, 479.98, 320)};
				
				@media (max-width: ${em(479.98)}) {
					margin-left: 50%;
				}
			}
		}
	}
	
	
`;

export const EditNotEdit = styled(({ data, isCaption, ...props }) => (
	<div {...props}>{data}</div>
))`
	font-family: "RobotoRegular", sans-serif;
	font-size: ${({isCaption}) => isCaption ? rem(32) : rem(16)};
	color: ${vars.text};
`;

export const AddPhotoBlock = styled(({ children, ...props }) => (
	<div {...props}>
		{children}
	</div>
))`
	border: ${rem(1)} solid ${vars.lightGreen};
	border-radius: ${rem(10)};
	box-shadow: ${rem(2)} ${rem(4)} ${rem(2)} ${rem(0)} ${rgba(vars.blackColor, .30)};
	overflow: hidden;
	margin-bottom: ${rem(7)};
	max-width: ${rem(250)};
	max-height: ${rem(136)};
	width: ${rem(250)};
	height: ${rem(136)};
`;

export const ButtonBtn = styled(({ handleaction, ...props }) => (
	<div {...props}>
		<Button type='back' equalPadding action={handleaction}>Назад</Button>
	</div>
))`
	position: fixed;
	align-self: flex-start;
	/* margin-top: ${rem(30)}; */
	margin-left: ${rem(50)};
`;

export const ContentPaddingTop = styled.div`
	margin-top: ${rem(10)};
`;

export const RecipeBlockContentWrapper = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	border-radius: ${rem(5)};
	background-color: ${vars.whiteColor};
	border: ${rem(1)} solid ${vars.lightGreen};
	padding: ${rem(20)};
`;