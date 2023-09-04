import { styled } from 'styled-components';
import { adaptiveValue, rem } from 'init/mixins';
import vars from 'init/vars';
import { rgba } from 'polished';
import { paths } from 'routes/helper';
import { Link } from 'react-router-dom';


export const LogoWrapper = styled(({ children, ...props }) => (
	<Link to={`${paths.home}`} {...props}>{children}</Link>
))`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const LogoIcon = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	${adaptiveValue("width", 30, 20)};
	${adaptiveValue("height", 30, 20)};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const LogoDivisor = styled.div`
	width: ${rem(5)};
`;

export const LogoDescriptionWrapper = styled.div`
	font-family: "RobotoRegular", sans-serif;
	text-transform: uppercase;
`;

export const LogoDescriptionTop = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	${adaptiveValue("font-size", 14, 10)};
	line-height: calc(21 / 18);
	color: ${vars.whiteColor};
	${adaptiveValue("letter-spacing", 2, 1)};
	margin-bottom: 0;
`;

export const LogoDescriptionBottom = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	${adaptiveValue("font-size", 12, 8)};
	color: ${rgba(255, 255, 255, .5)};
	${adaptiveValue("letter-spacing", 1, 0)};
`;