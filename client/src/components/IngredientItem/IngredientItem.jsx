import Input from 'components/Input/Input';
import React from 'react';
import { IngredientItemWrapper } from './styled';
import { useState } from 'react';
import Button from 'components/Button/Button';
import { ReactComponent as AddICO } from 'assets/img/icons/plus.svg';


// mode = 'change' || 'add' || 'view'
const IngredientItem = ({ mode, data, name, cloneAction }) => {
	const [oldValue, setOldValue] = useState('');
	const [newValue, setNewValue] = useState('');

	const handleOldChange = e => setOldValue(e.target.value);
	const handleNewChange = e => setNewValue(e.target.value);


	function handleClick() {
		if (mode === 'add') {
			cloneAction();
		}
	}

	function handleKeyPress(e) {
		if (e.key === 'Enter') {
			if (mode === 'add') {
				cloneAction();
			}
		}
	}


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
							fz={16}
							noBorder
							bgAdminLayer
							value={newValue}
							handleChange={handleNewChange}
							handleKeyPress={handleKeyPress}
						/>
						<Button type="plain" equalPadding action={handleClick}><AddICO /></Button>
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