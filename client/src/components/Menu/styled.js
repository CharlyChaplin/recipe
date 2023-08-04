import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { adaptiveValue, em, rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";
import { nanoid } from "nanoid";


export const MenuBody = styled.nav`
	transition: all 0.25s ease-in-out 0s;
	@media (max-width: ${em(925)}) {
		position: fixed;
		width: 100%;
		height: 100%;
		transform: translate(0%, -100%);
		background-image: linear-gradient(${vars.buttonTopBottomDarkColor}, ${vars.dark});
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: ${rem(70)};
		padding-bottom: ${rem(30)};
		padding-bottom: ${rem(84)};
		overflow: auto;
		.menu-open & {
			transform: translate(0%, 0%);
		}
	}
`;

export const MenuList = styled.ul`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-family: "RalewayRegular", sans-serif;
	${adaptiveValue("margin-bottom", 50, 50, 1, 925, 320)};
	@media (max-width: ${em(925)}) {
		margin-bottom: ${rem(30)};
		flex-direction: column;
	}
`;

export const MenuItem = styled(({ items, ...props }) => (
	items.map(({ link, caption }) => (
		<NavLink to={link} key={nanoid()} {...props}>{caption}</NavLink>
	))
))`
	white-space: nowrap;
	border: 1px solid ${rgba(vars.lightGreen, 0.25)};
	transition: all 0.25s ease 0s;
	color: ${vars.whiteColor};

	${adaptiveValue("font-size", 16, 16, 0, 1210, 925.01)};
	${adaptiveValue("font-size", 16, 16, 1, 925, 320)};
	${adaptiveValue("margin-right", 30, 0)};

	${adaptiveValue("padding-top", 7, 7)};
	${adaptiveValue("padding-bottom", 7, 7)};
	${adaptiveValue("padding-right", 15, 15)};
	${adaptiveValue("padding-left", 15, 15)};

	${adaptiveValue("border-radius", 10, 10)};
	${adaptiveValue("letter-spacing", 2, 2)};
	
	&:last-child {
		margin-right: 0;
	}

	&:not(:last-child) {
		${adaptiveValue("margin-bottom", 19, 25, 1, 925, 320)};
	}

	&.active {
		background: ${rgba(vars.lightGreen, .4)};
	}
	
	&:hover {
		border: 1px solid ${rgba(vars.lightGreen, .5)};
	}
	
	@media (max-width: ${em(925)}) {
		margin-right: 0;
	}
	@media (max-width: ${em(767.98)}) {
		&:not(:last-child) {
			margin-right: 0;
		}
	}
`;