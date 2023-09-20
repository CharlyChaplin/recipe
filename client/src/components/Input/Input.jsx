import React from 'react';
import { InputElement, InputLabel, InputWrapper, TextareaElement } from './styled';


const Input = ({
	labelPos = 'row',
	labelText = "",
	type = "text",
	name = "",
	value = "",
	rowsNumber = 4,
	noBorder,
	bgAdminLayer,
	placeholder = "",
	disabled,
	center = false,
	autoFocus = false,
	rectangle = false,
	fz = null,
	handleChange = () => { },
	handleKeyPress = () => { }
}) => {
	return (
		<>
			<InputWrapper labelPos={labelPos} type={type}>
				{!!labelText && labelText.length > 0 && <InputLabel labelPos={labelPos}>{labelText}</InputLabel>}

				{
					((type === "text" || "password") && (type !== "textarea"))
						? <InputElement
							name={name}
							value={value}
							center={center}
							disabled={disabled}
							autoFocus={autoFocus}
							rectangle={rectangle}
							noBorder={noBorder}
							bgAdminLayer={bgAdminLayer}
							fz={fz}
							type={type}
							placeholder={placeholder}
							onChange={handleChange}
							onKeyDown={(e) => handleKeyPress(e, name)}
						/>
						: null
				}

				{
					type === "textarea" &&
					<TextareaElement
						placeholder={placeholder}
						name={name}
						value={value}
						disabled={disabled}
						rowsNumber={rowsNumber}
						autoFocus={autoFocus}
						rectangle={rectangle}
						noBorder={noBorder}
						bgAdminLayer={bgAdminLayer}
						fz={fz}
						onChange={handleChange}
						onKeyDown={handleKeyPress}
						autoComplete="off"
					/>
				}
			</InputWrapper>
		</>
	);
}

export default Input;