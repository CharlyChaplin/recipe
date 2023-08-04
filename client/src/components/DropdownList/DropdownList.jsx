import React from 'react';
import { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { ItcCollapse } from './collapse.js';
import { Dropdown, DropdownBody, DropdownButtons, DropdownControl, DropdownDropbox, DropdownIcon, DropdownInputWrapper, DropdownLabel, DropdownListitem, DropdownListt, DropdownWrapper } from './styled.js';
import Button from 'components/Button/Button.js';
import vars from 'init/vars.js';
import { UseOnClickOutside } from 'helpers/hooks';
import { useState } from 'react';


const DropdownList = ({
	elements = [],
	placeholder = "",
	selectedValue,
	labelText,
	labelPos,
	inputText = '',
	setInputText = () => { },
	buttonDeleteIcon = '',
	buttonDeleteAction = () => { },
	buttonDeleteDisabled,
	buttonEditIcon = '',
	buttonEditAction = () => { },
	buttonEditDisabled,
}) => {
	const dropdown = useRef(null);
	const input = useRef(null);
	const list = useRef(null);
	const collapseButton = useRef(null);
	let collapse;


	useEffect(() => {
		init();
	});

	function init() {
		collapse = new ItcCollapse(list.current, dropdown.current);
		list.current.childNodes.forEach(el => {
			el.addEventListener("click", e => {
				input.current.style.color = input.current.value === placeholder ? vars.placeholderColor : vars.text;
				setInputText(e.currentTarget.textContent);
				input.current.value = e.currentTarget.textContent;
				if (selectedValue) selectedValue(input.current.value);
				onBodyHide();
			})
		});
	}

	function onBodyHide() {
		collapse.hide()
	};

	function handleCollapse() {
		collapse.toggle();
	}

	UseOnClickOutside(dropdown, onBodyHide);

	return (
		<>
			<Dropdown ref={collapseButton}>
				<DropdownBody>
					<DropdownControl $position={labelPos}>
						{!!labelText && labelText.length > 0 && <DropdownLabel $position={labelPos}>{labelText}</DropdownLabel>}

						<DropdownWrapper ref={dropdown} onClick={handleCollapse}>
							<DropdownInputWrapper>
								<DropdownDropbox>
									<input ref={input} value={inputText} onChange={setInputText} type="text" placeholder={placeholder} readOnly />
									<DropdownIcon>
										<svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M4.67397 1.21062C5.07097 0.628781 5.92903 0.628781 6.32603 1.21062L10.0623 6.68638C10.5152 7.35016 10.0398 8.25 9.23624 8.25H1.76376C0.960186 8.25 0.484816 7.35016 0.93773 6.68638L4.67397 1.21062Z" fill={vars.lightGreen} />
										</svg>
									</DropdownIcon>
								</DropdownDropbox>
							</DropdownInputWrapper>
							<DropdownListt ref={list} className="collapse">
								{
									elements.length > 0
										? elements.map(el => {
											return (
												<DropdownListitem key={nanoid()}>
													{el}
												</DropdownListitem>
											)
										})
										: <DropdownListitem noItems>Нет элементов...</DropdownListitem>
								}
							</DropdownListt>
						</DropdownWrapper>
					</DropdownControl>
					<DropdownButtons>
						{
							!!buttonDeleteIcon && <Button equalPadding mode="dangerIco" disabled={buttonDeleteDisabled} onClick={buttonDeleteAction}>{buttonDeleteIcon}</Button>
						}
						{
							!!buttonEditIcon && <Button equalPadding disabled={buttonEditDisabled} onClick={buttonEditAction}>{buttonEditIcon}</Button>
						}
					</DropdownButtons>
				</DropdownBody>
			</Dropdown>
		</>
	);
}

export default DropdownList;