import { styled } from "styled-components";
import vars from "init/vars.js";
import { adaptiveValue, rem } from "init/mixins.js";

const radius = rem(7);

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: ${({ $labelPos }) => $labelPos && $labelPos === 'row' ? "row" : "column"};
	justify-content: ${({ $labelPos }) => $labelPos && $labelPos === 'row' ? "center" : "flex-start"};
	align-items: ${({ $labelPos, $type }) => $labelPos && $labelPos === 'row'
		? $type === 'textarea'
			? "flex-start"
			: "center"
		: "flex-start"
	};
	width: 100%;
	height: 100%;
`;

export const InputLabel = styled.div`
	${adaptiveValue("font-size", 16, 16)};
	color: ${vars.text};
	letter-spacing: ${rem(1)};
	margin: ${({ $labelPos }) => $labelPos && $labelPos === 'row' ? `0 ${rem(15)} 0 0` : `0 0 ${rem(7)} ${rem(10)}`};
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
	padding: ${rem(7)} ${rem(10)};
	font-size: ${({ type, fz }) => type === 'password' ? rem(17) : fz ? rem(fz) : rem(16)};
	font-family: "RobotoRegular", sans-serif;
	border: ${({ noBorder }) => noBorder ? rem(0) : rem(1)} solid ${({disabled}) => disabled ? vars.disabledColor : vars.lightGreen};
	&::placeholder{
		color: ${({ bgAdminLayer }) => bgAdminLayer ? vars.placeholderColorForAdminLayer : vars.placeholderColor};
		font-family: "RobotoRegular", sans-serif;
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
	outline: ${({ noBorder }) => noBorder ? rem(0) : rem(1)} solid ${({disabled}) => disabled ? vars.disabledColor : vars.lightGreen};
	&::placeholder{
		color: ${vars.placeholderColor};
		font-family: "RobotoRegular", sans-serif;
	}
`;
