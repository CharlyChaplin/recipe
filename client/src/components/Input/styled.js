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
	autoFocus,
	type,
	placeholder,
	onChange = () => { },
	onKeyDown = () => { },
	...props
}) => (
	<input
		{...props}
		name={name}
		value={value}
		autoFocus={autoFocus}
		type={type}
		placeholder={placeholder}
		onChange={onChange}
		onKeyDown={onKeyDown}
	/>
))`
	width: 100%;
	border-radius: ${radius};
	letter-spacing: ${rem(1)};
	padding: ${rem(7)} ${rem(10)};
	font-size: ${p => p.type === 'password' ? rem(17) : rem(16)};
	font-family: "RobotoRegular", sans-serif;
	border: 1px solid ${vars.lightGreen};
	&::placeholder{
		color: ${vars.placeholderColor};
		font-family: "RobotoRegular", sans-serif;
	}
	&:active, &:focus {
		outline: none;
	}
`;

export const TextareaElement = styled(({
	name,
	value,
	autoFocus,
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
		rows={4}
		onChange={onChange}
		onKeyDown={onKeyDown}
	/>
))`
	width: 100%;
	border-radius: ${radius};
	letter-spacing: ${rem(1)};
	padding: ${rem(7)} ${rem(10)};
	font-family: "RobotoRegular", sans-serif;
	font-size: ${rem(16)};
	resize: vertical;
	outline: 1px solid ${vars.lightGreen};
	&::placeholder{
		color: ${vars.placeholderColor};
		font-family: "RobotoRegular", sans-serif;
	}
`;
