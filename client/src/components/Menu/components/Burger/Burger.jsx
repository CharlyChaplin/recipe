import React from 'react';
import { menuInit } from './menuBurger';
import { BurgerButton, IconMenuWrapper } from './styled';


const Burger = () => {

	return (
		<>
			<BurgerButton onClick={menuInit} className="icon-menu">
				<IconMenuWrapper />
			</BurgerButton>
		</>
	);
}

export default Burger;