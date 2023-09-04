import { styled } from "styled-components";
import vars from "init/vars";
import { adaptiveValue, rem } from "init/mixins";
import { mainContainer } from "init/mainStyle";
import { rgba } from "polished";


export const FooterWrapper = styled.footer`
	background-image: linear-gradient(${vars.dark}, ${vars.buttonTopBottomDarkColor});
	z-index: 1;
	letter-spacing: ${rem(1)};
	width: 100%;
`;

export const FooterContainer = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	${adaptiveValue("padding-top", 10, 10)};
	${adaptiveValue("padding-bottom", 10, 10)};
	color: ${vars.whiteColor};
	a {
		color: ${vars.whiteColor};
	};
	// оборачиваем в главный контейнер из главных стилей
	${mainContainer}
`;

export const FooterIco = styled.div``;

export const FooterAbout = styled.div`
	font-family: "RalewaySemibold", sans-serif;
	${adaptiveValue("font-size", 16, 12)};
	a {
		position: relative;
		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: ${rem(-4)};
			width: 0;
			height: ${rem(1)};
			background-color: ${rgba(255, 255, 255, 0)};
			transition: all 0.25s ease 0s;
		}
		&:hover {
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				background-color: ${rgba(255, 255, 255, .5)};
			}
		}
	}
`;

export const FooterYear = styled(({ children, ...props }) => (
	<div {...props}>
		<span>2023г.</span>
	</div>
))`
	font-family: "RobotoRegular", sans-serif;
	${adaptiveValue("font-size", 15, 12)};
	${adaptiveValue("letter-spacing", 2, 0)};
`;