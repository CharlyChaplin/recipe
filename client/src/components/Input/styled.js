import { styled } from "styled-components";
import vars from "init/vars.js";
import { adaptiveValue, rem } from "init/mixins.js";

const radius = rem(7);

export const InputWrapper = styled(({ labelPos, children, ...props }) => (
	<div {...props}>{children}</div>
))`
	display: flex;
	flex-direction: ${({ labelPos }) => labelPos && labelPos === 'row' ? "row" : "column"};
	justify-content: ${({ labelPos }) => labelPos && labelPos === 'row' ? "center" : "flex-start"};
	align-items: ${({ labelPos, type }) => labelPos && labelPos === 'row'
		? type === 'textarea'
			? "flex-start"
			: "center"
		: "flex-start"
	};
	width: 100%;
	height: 100%;
`;

export const InputLabel = styled(({ labelPos, children, ...props }) => (
	<div {...props}>{children}</div>
))`
	${adaptiveValue("font-size", 16, 12)};
	color: ${vars.text};
	${adaptiveValue('letter-spacing', 1, 0)};
	margin: 0;
	
	${({ labelPos }) => labelPos && labelPos === 'row'
		? `${adaptiveValue('margin-right', 15, 5)}`
		: `${adaptiveValue('margin-left', 10, 10)}`
	};
	${({ labelPos }) => labelPos && labelPos === 'row'
		? `${adaptiveValue('margin-right', 15, 5)}`
		: `${adaptiveValue('margin-bottom', 7, 5)}`
	};
	white-space: nowrap;
	font-family: "RobotoRegular", sans-serif;
`;

export const InputElement = styled(({
	name,
	value,
	center,
	autoFocus,
	rectangle,
	noBorder,
	disabled,
	bgAdminLayer,
	fz,
	type,
	placeholder,
	onChange = () => { },
	onKeyDown = () => { },
	...props
}) => {
	return (
		<input
			{...props}
			name={name}
			value={value}
			autoFocus={autoFocus}
			type={type}
			disabled={disabled}
			placeholder={placeholder}
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	)
})`
	display: block;
	background: ${({ bgAdminLayer }) => bgAdminLayer ? vars.adminLayer : ''};
	width: 100%;
	border-radius: ${({ rectangle }) => rectangle ? 0 : radius};
	letter-spacing: ${rem(1)};
	${adaptiveValue('padding-top', 7, 3)};
	${adaptiveValue('padding-bottom', 7, 3)};
	${adaptiveValue('padding-left', 10, 5)};
	${adaptiveValue('padding-right', 10, 5)};
	${({ type, fz }) => type === 'password'
		? `${adaptiveValue('font-size', 17, 15)}`
		: fz
			? `${adaptiveValue('font-size', vars.fz, 14)}`
			: `${adaptiveValue('font-size', 16, 14)}`
	};
	font-family: "RobotoRegular", sans-serif;
	border: ${({ noBorder }) => noBorder ? rem(0) : rem(1)} solid ${({ disabled }) => disabled ? vars.disabledColor : vars.lightGreen};
	&::placeholder{
		color: ${({ bgAdminLayer }) => bgAdminLayer ? vars.placeholderColorForAdminLayer : vars.placeholderColor};
		font-family: "RobotoRegular", sans-serif;
		font-size: ${({ type }) => type === 'password'
		? `${adaptiveValue('font-size', 17, 11)}`
		: `${adaptiveValue('font-size', 16, 11)}`}
	}
	&:active, &:focus {
		outline: none;
	}
	// выравнивание placeholder по центру
	&::-webkit-input-placeholder {
		text-align: ${({ center }) => center ? 'center' : 'left'};
	}
	&::-moz-placeholder {
		text-align: ${({ center }) => center ? 'center' : 'left'};
	}
	&:-moz-placeholder {
		text-align: ${({ center }) => center ? 'center' : 'left'};
	}
	&:-ms-input-placeholder {
		text-align: ${({ center }) => center ? 'center' : 'left'};
	}
`;

export const TextareaElement = styled(({
	name,
	value,
	rowsNumber,
	autoFocus,
	rectangle,
	noBorder,
	disabled,
	fz,
	type,
	placeholder,
	onChange = () => { },
	onKeyDown = () => { },
	autoComplete = "off",
	...props
}) => (
	<textarea
		{...props}
		name={name}
		value={value}
		autoFocus={autoFocus}
		type={type}
		placeholder={placeholder}
		rows={rowsNumber}
		onChange={onChange}
		onKeyDown={onKeyDown}
	/>
))`
	width: 100%;
	height: 100%;
	border-radius: ${({ rectangle }) => rectangle ? 0 : radius};
	letter-spacing: ${rem(1)};
	padding: ${rem(7)} ${rem(10)};
	font-family: "RobotoRegular", sans-serif;
	font-size: ${({ fz }) => fz ? rem(fz) : rem(16)};
	resize: none;
	outline: ${({ noBorder }) => noBorder ? rem(0) : rem(1)} solid ${({ disabled }) => disabled ? vars.disabledColor : vars.lightGreen};
	&::placeholder{
		color: ${vars.placeholderColor};
		font-family: "RobotoRegular", sans-serif;
	}
`;
