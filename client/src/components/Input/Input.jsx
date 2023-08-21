import React from 'react';
import { InputElement, InputLabel, InputWrapper, TextareaElement } from './styled';


const Input = ({
	labelPos = 'row',
	labelText = "",
	type = "text",
	name = "",
	value = "",
	placeholder = "",
	center = false,
	selectAll = false,
	autoFocus = false,
	rectangle = false,
	fz = null,
	handleChange = () => { },
	handleKeyPress = () => { }
}) => {
	return (
		<>
			<InputWrapper $labelPos={labelPos} $type={type}>
				{!!labelText && labelText.length > 0 && <InputLabel $labelPos={labelPos}>{labelText}</InputLabel>}

				{
					((type === "text" || "password") && (type !== "textarea"))
						? <InputElement
							name={name}
							value={value || undefined}
							center={center}
							autoFocus={autoFocus}
							rectangle={rectangle}
							fz={fz}
							type={type}
							placeholder={placeholder}
							onChange={handleChange}
							onKeyPress={handleKeyPress}
						/>
						: null
				}

				{
					type === "textarea" &&
					<TextareaElement
						placeholder={placeholder}
						name={name}
						value={value}
						autoFocus={autoFocus}
						rectangle={rectangle}
						fz={fz}
						onChange={handleChange}
						autoComplete="off"
						rows={6}
					/>
				}
			</InputWrapper>
		</>
	);
}

export default Input;