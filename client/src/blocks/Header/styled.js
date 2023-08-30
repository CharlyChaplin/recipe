import { styled } from "styled-components";
import vars from "init/vars";
import { adaptiveValue, rem } from "init/mixins";
import { mainContainer } from "init/mainStyle";


export const HeaderWrapper = styled.header`
	background-image: linear-gradient(${vars.buttonTopBottomDarkColor}, ${vars.dark});
	width: 100%;
	z-index: 1;
`;

export const HeaderContainer = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	// оборачиваем в главный контейнер из главных стилей
	${mainContainer}
`;

export const HeaderTop = styled.div`
	${adaptiveValue("padding-top", vars.headerPadding, vars.headerPadding)};
	${adaptiveValue("padding-bottom", vars.headerPadding, vars.headerPadding)};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	position: relative;
	color: ${vars.whiteColor};
	gap: ${rem(10)};
	width: 100%;
`;

export const HeaderLogo = styled.div`
	z-index: 1;
`;

export const HeaderMenu = styled.div`
	
`;

export const HeaderAuth = styled.div`
	z-index: 1;
	/* align-self: stretch; */
`;