import Input from 'components/Input/Input';
import React from 'react';
import { IngredientItemWrapper } from './styled';
import { useState } from 'react';
import Button from 'components/Button/Button';
import { ReactComponent as AddICO } from 'assets/img/icons/plus.svg';


const IngredientItem = ({ mode, data, name }) => {
	const [oldValue, setOldValue] = useState('');
	const [newValue, setNewValue] = useState('');

	const handleOldChange = e => setOldValue(e.target.value);
	const handleNewChange = e => setNewValue(e.target.value);


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
							value={oldValue}
							handleChange={handleOldChange}
						/>

						<span>Заменить на</span>

						<Input
							placeholder='ингредиент...'
							name={`new:${name}`}
							rectangle
							fz={12}
							value={newValue}
							handleChange={handleNewChange}
						/>
					</IngredientItemWrapper>
				</>
			);

		case 'add':
			return (
				<>
					<IngredientItemWrapper>
						<Input
							placeholder={data}
							rectangle
							fz={12}
							noBorder
							value={newValue}
							handleChange={handleNewChange}
						/>
						<Button type="plain" equalPadding><AddICO /></Button>
					</IngredientItemWrapper>
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