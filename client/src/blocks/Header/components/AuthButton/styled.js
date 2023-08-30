import { styled } from "styled-components";
import { rgba } from "polished";
import { adaptiveValue, rem } from "init/mixins";
import { ReactComponent as AuthICO } from 'assets/img/icons/login.svg';
import vars from "init/vars";
import { Link } from "react-router-dom";
import { paths } from "routes/helper";
import Spinner from "components/Spinner";



export const AuthElementWrapper = styled(({ children, isAuth, showMenu, ...props }) => (
	<>
		{
			!isAuth
				? <Link to={paths.signin} {...props}>
					{children}
				</Link>
				: <div {...props} onClick={showMenu}>
					{children}
				</div>
		}
	</>

))`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	border: 1px solid ${vars.darkGreen};
	border-radius: ${rem(10)};
	padding: ${rem(3)} ${rem(13)};
	transition: all 0.25s ease 0s;
	&:hover {
		border: 1px solid ${rgba(vars.accent, .75)};
		cursor: pointer;
	}
`;

export const AuthImage = styled(({ isAuth, image = null, ...props }) => {
	return (
		<div {...props}>
			{
				isAuth
					? image
						? <img src={image} alt="Avatar" />
						: <AuthICO />
					: <AuthICO />
			}
		</div>
	)
})`
	width: ${rem(30)};
	height: ${rem(30)};
	display: flex;
	flex-direction: row;
	border-radius: ${({ isAuth }) => isAuth ? 50 : 0}%;
	overflow: ${({ isAuth }) => isAuth ? 'hidden' : 'auto'};
	border: ${({ isAuth }) => isAuth ? `${rem(1)} solid ${rgba(vars.whiteColor, 0.25)}` : 'none'};
	box-shadow: ${({ isAuth }) => isAuth ? `${rem(0)} ${rem(0)} ${rem(3)} ${rem(0)} ${rgba(vars.whiteColor, 0.5)}` : 'none'};
	justify-content: center;
	align-items: center;
	margin-bottom: ${rem(5)};
	svg {
		width: 100%;
		height: 100%;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

export const AuthText = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	font-family: "RobotoLight", sans-serif;
	${adaptiveValue("font-size", 13, 13)};
	letter-spacing: ${rem(1)};
	color: ${vars.whiteColor};
`;

export const DropDownMenuWrapper = styled(({ children, isShow = false, ...props }) => (
	<ul {...props}>{children}</ul>
))`
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(18)};
	position: absolute;
	top: calc(100% + ${rem(vars.headerPadding)});
	right: ${rem(0)};
	width: fit-content;
	background-color: ${vars.lightGreen};
	border: 1px solid ${rgba(vars.whiteColor, .5)};
	border-radius: ${rem(5)};
	overflow: hidden;
	display: flex;
	flex-direction: column;
	transform: translate(${({ isShow }) => isShow ? 0 : 100}%, 0%);
	opacity: ${({ isShow }) => isShow ? 1 : 0};
	visibility: ${({ isShow }) => isShow ? 'visible' : 'hidden'};
	transition: all 0.3s ${vars.cubic} 0s;
`;

export const DropDownMenuListItem = styled(({ children, path, text, ...props }) => (
	<li {...props}>
		{
			path
				? <Link to={path}>{text}</Link>
				: <span>{text}</span>
		}
	</li>
))`
	transition: all 0.25s ease 0s;
	text-align: center;
	text-transform: lowercase;
	letter-spacing: ${rem(2)};
	> * {
		padding: ${rem(10)};
	}
	a {
		display: flex;
		color: ${vars.whiteColor};
	}
	span {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	&:hover {
		background-color: ${vars.darkGreen};
	}
`;