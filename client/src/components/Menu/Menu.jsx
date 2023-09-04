import React from 'react';
import { MenuBody, MenuItem, MenuList } from './styled';

import Burger from './components/Burger';
import menuItem from './menuItems';
import { menuClose } from './components/Burger/menuBurger';


const Menu = () => {
	return (
		<>
			<Burger />
			<MenuBody>
				<MenuList>
					<MenuItem onClick={menuClose} items={menuItem} />
				</MenuList>
			</MenuBody>
		</>
	);
}

export default Menu;