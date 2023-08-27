import Input from 'components/Input/Input';
import React from 'react';
import { IngredientItemWrapper } from './styled';
import { useState } from 'react';
import Button from 'components/Button/Button';
import { ReactComponent as MinusICO } from 'assets/img/icons/minus.svg';
import { useWhyDidYouUpdate } from 'ahooks';


// mode = 'change' || 'add' || 'view'
const IngredientItem = ({ mode, data, name, cloneAction, deleteAction, value, handleChange, getKey }) => {
	const [oldValue, setOldValue] = useState('');
	const [newValue, setNewValue] = useState('');
	
	// useWhyDidYouUpdate('IngredientItem', { mode, data, name, cloneAction, deleteAction, value, handleChange, getKey });

	const handleOldChange = e => setOldValue(e.target.value);
	const handleNewChange = e => setNewValue(e.target.value);


	
	function handleMinusClick(val) {
		if (mode === 'add') {
			deleteAction(val);
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
							name={name}
							placeholder={data}
							rectangle
							fz={16}
							autoFocus
							noBorder
							bgAdminLayer
							value={value}
							handleChange={e => handleChange(name, e)}
							handleKeyPress={getKey}
						/>
						<Button type="plain" equalPadding action={() => handleMinusClick(name)}><MinusICO /></Button>
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