import React from 'react';
import { IngredientShowListItem } from './styled';


const IngredientItem = ({ item, listIcon }) => {

	return (
		<IngredientShowListItem image={listIcon}>
			{item}
		</IngredientShowListItem>
	);
}

export default IngredientItem;