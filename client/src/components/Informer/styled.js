import { styled } from "styled-components";
import { adaptiveValue, rem } from "init/mixins";
import vars from "init/vars";
import { rgba } from "polished";
import { ReactComponent as WarningIco } from './img/warning.svg';
import { ReactComponent as OkIco } from './img/ok.svg';
import { ReactComponent as CancelIco } from './img/cancel.svg';


export const Info = styled(({ children, view = false, warning, ok, cancel, ...props }) => (
	<div {...props}>{children}</div>
))`
	position: fixed;
	left: 50%;
	top: 0;
	width: fit-content;
	transform: translate(-50%, ${({ view }) => view ? 1 : -110}%);
	z-index: 10000;
	background-color: ${vars.informerBackColor};
	${adaptiveValue('border-radius', 10, 5)};
	overflow: hidden;
	${adaptiveValue('border-width', 2, 1)};
	border-style: solid;
	border-color: ${rgba(vars.whiteColor, .75)};
	max-width: ${rem(500)};
	${adaptiveValue('padding-top', 10, 5)};
	${adaptiveValue('padding-bottom', 10, 5)};
	${adaptiveValue('padding-left', 20, 10)};
	${adaptiveValue('padding-right', 20, 10)};
	transition: all 0.25s ${vars.cubic} 0s;
	cursor: default;
`;

export const InfoWrapper = styled(({ children, warning, ok, cancel, isConfirm, ...props }) => (
	<div {...props}>{children}</div>
))`
	width: 100%;
	color: ${vars.whiteColor};
	display: ${({ warning, ok, cancel, isConfirm }) =>
		(warning || ok || cancel) && (isConfirm.ok || isConfirm.cancel)
			? 'flex'
			: 'grid'
	};
	
	grid-template-columns: ${({ isConfirm }) => (isConfirm.ok || isConfirm.cancel) ? '1fr' : 'auto auto'};
	grid-template-rows: ${({ isConfirm }) => (isConfirm.ok || isConfirm.cancel) ? 'auto' : '1fr'};
	${({ isConfirm }) => (isConfirm.ok || isConfirm.cancel) ? 'grid-auto-flow: column' : null};
	justify-content: start;
	justify-items: ${({ isConfirm }) => (isConfirm.ok || isConfirm.cancel) ? 'center' : 'start'};
	gap: ${({ warning, ok, cancel, isConfirm }) => (warning || ok || cancel || (isConfirm.ok || isConfirm.cancel)) ? `${adaptiveValue('gap', 20, 10)}` : 0};
`;

export const InfoIcon = styled(({ warning, ok, cancel, ...props }) => (
	<div {...props}>
		{warning && <WarningIco />}
		{ok && <OkIco />}
		{cancel && <CancelIco />}
	</div>
))`
	align-self: center;
	display: ${({ warning, ok, cancel }) => (warning || ok || cancel) ? 'flex' : 'none'};
	flex-direction: row;
	justify-content: center;
	align-items: center;
	${adaptiveValue('max-width', 25, 22)};
	${adaptiveValue('max-height', 25, 22)};
	
	svg {
		width: 100%;
		height: 100%;
		fill: ${({ warning, ok, cancel }) => (
			warning
				? 'orange'
				: ok
					? 'lightgreen'
					: cancel
						? 'orangeRed'
						: 'none'
			)
		}
	}
`;

export const InfoContent = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: column;
	${adaptiveValue('gap', 15, 10)};
	align-items: center;
	justify-content: center;
	width: fit-content;
`;

export const InfoText = styled(({ children, ...props }) => (
	<div {...props}>{children}</div>
))`
	font-family: "RobotoRegular", sans-serif;
	${adaptiveValue('font-size', 18, 13)};
	width: 100%;
	line-height: 1.3;
	white-space: wrap;
`;

export const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	${adaptiveValue('gap', 15, 7)};
`;

