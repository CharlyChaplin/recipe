import React from 'react';
import { MenuBody, MenuItem, MenuList } from './styled';

import Burger from './components/Burger';
import menuItem from './menuItems';


const Menu = () => {
	return (
		<>
			<Burger />
			<MenuBody>
				<MenuList>
					<MenuItem items={menuItem} />
				</MenuList>
			</MenuBody>
		</>
	);
}

export default Menu;