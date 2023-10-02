import { styled } from "styled-components";
import { em, rem } from "init/mixins";
import vars from "init/vars";


export const BurgerButton = styled(({ children, ...props }) => (
	<button aria-label="Menu-burger" {...props}>{children}</button>
))`
	display: none;
	@media (max-width: ${em(925)}) {
		display: block;
		background-color: transparent;
		padding: ${rem(10)};
		cursor: pointer;
		border-radius: ${rem(4)};
		transition: all 0.25s ease 0s;
	}
`;

export const IconMenuWrapper = styled(({ ...props }) => (
	<div {...props}><span></span></div>
))`
	position: relative;
	top: 0;
	right: 0;
	width: 25px;
	height: 20px;
	cursor: pointer;
	transition: all 0.25s ease 0s;
	z-index: 1;

	&:before, &:after, span {
		content: '';
		transition: all 0.25s ease 0s;
		right: 0;
		position: absolute;
		width: ${rem(2)};
		border-radius: 50%;
		height: ${rem(2)};
		background-color: ${vars.logoLight}
	}

	&:before {
		top: 0px;
		width: 70%;
	}

	&:after {
		bottom: ${rem(0)};
		width: 90%;
	}

	span {
		top: calc(50% - ${rem(1)});
		width: 50%;
	}
	.menu-open & {
		span {
			width: 0;
		}

		&::before, &::after {
			width: 100%;
		}

		&::before {
			top: calc(50% - ${rem(1)});
			transform: rotate(-45deg);
		}

		&::after {
			bottom: calc(50% - ${rem(1)});
			transform: rotate(45deg);
		}
	}
`;