import React, { forwardRef } from "react";
import { ButtonElement } from "./styled";


// children,
// mode = '',				// 'dangerIco'
// type = 'common',		// common | back | dark | plain
// disabled,
// equalPadding,
// action = () => { },

const Button = forwardRef((props, ref) => {
	
	return (
		<>
			<ButtonElement
				hidden={props.hidden}
				name={props.name}
				child={props.children}
				mode={props.mode}
				type={props.type}
				disabled={props.disabled}
				equalPadding={props.equalPadding}
				action={props.action}
				isRef={ref}
			/>
		</>
	)


});

export default Button;