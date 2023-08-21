import Input from 'components/Input/Input';
import React from 'react';
import { IngredientItemWrapper } from './styled';


const IngredientItem = ({ mode, data, name }) => {

	switch (mode) {
		case 'change':
			return (
				<>
					<IngredientItemWrapper>
						<Input
							name={`old:${name}`}
							placeholder={data}
							rectangle
							fz={12}
						/>

						<span>Заменить на</span>

						<Input
							placeholder='новый ингредиент...'
							name={`new:${name}`}
							rectangle
							fz={12}
						/>
					</IngredientItemWrapper>
				</>
			);

		case 'add':
			return (
				<>

				</>
			);

		case 'view':
			return (
				<>

				</>
			);
	}

}

export default IngredientItem;