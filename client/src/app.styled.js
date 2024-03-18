import { styled } from "styled-components";
import { lighten, rgba } from "polished";
import vars from "init/vars";
import { rem } from "init/mixins";



export const Page = styled(({ children, ...props }) => (
	<main {...props}>
		{children}
	</main>
))`
	flex: 1 1 auto;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${rem(0)} ${rem(7)};
	width: 100%;
	overflow: hidden;
	background-color: ${vars.dark};
	z-index: 0;
`;

export const ServerDown = styled(({ ...props }) => (
	<div {...props}>
		<span>
			Связь с сервером отсутствует
		</span>
	</div>
))`
	overflow: auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	
	>span {
		display: flex;
		position: fixed;
		left: 50%;
		transform: translate(-50%, 0%);
		top: 0;
		width: fit-content;
		margin: 0 auto;
		padding: ${rem(5)} ${rem(10)};
		box-shadow: ${rem(0)} ${rem(0)} ${rem(5)} ${rem(0)} ${rgba(vars.redColor, .5)};
		background-color: ${lighten(.2, vars.redColor)};
		font-family: "RobotoLight", sans-serif;
		color: ${vars.whiteColor};
		letter-spacing: ${rem(1)};
		line-height: 1.5;
		text-align: center;
		z-index: 10;
	}
`;