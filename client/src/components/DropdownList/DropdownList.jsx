import React from 'react';
import { useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { ItcCollapse } from './collapse.js';
import { Dropdown, DropdownBody, DropdownButtons, DropdownControl, DropdownDropbox, DropdownIcon, DropdownInputWrapper, DropdownLabel, DropdownListitem, DropdownListt, DropdownWrapper } from './styled.js';
import Button from 'components/Button/Button.js';
import vars from 'init/vars.js';
import { UseOnClickOutside } from 'helpers/hooks';
import {ReactComponent as ArrowICO} from './icon/arrow.svg';


const DropdownList = ({
	elements = [],
	placeholder = "",
	selectedValue,
	minWidth,
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
	buttonActionPosition = 'row'
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
				<DropdownBody buttonDeleteIcon={buttonDeleteIcon} buttonEditIcon={buttonEditIcon} buttonActionPosition={buttonActionPosition}>

					<DropdownControl position={labelPos}>
						{!!labelText && labelText.length > 0 && <DropdownLabel position={labelPos}>{labelText}</DropdownLabel>}

						<DropdownWrapper ref={dropdown} onClick={handleCollapse}>
							<DropdownInputWrapper>
								<DropdownDropbox minWidth={minWidth}>
									<input ref={input} value={inputText} onChange={setInputText} type="text" placeholder={placeholder} readOnly />
									<DropdownIcon>
										<ArrowICO />
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

					<DropdownButtons buttonActionPosition={buttonActionPosition}>
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