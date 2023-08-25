import Input from 'components/Input/Input';
import React, { createRef } from 'react';
import { IngredientItemWrapper } from './styled';
import { useState } from 'react';
import Button from 'components/Button/Button';
import { ReactComponent as AddICO } from 'assets/img/icons/plus.svg';
import { ReactComponent as MinusICO } from 'assets/img/icons/minus.svg';


// mode = 'change' || 'add' || 'view'
const IngredientItem = ({ mode, data, name, cloneAction, deleteAction, value, handleChange, getKey }) => {
	const [oldValue, setOldValue] = useState('');
	const [newValue, setNewValue] = useState('');
	const btn = createRef();

	const handleOldChange = e => setOldValue(e.target.value);
	const handleNewChange = e => setNewValue(e.target.value);


	function handleAddClick() {
		if (mode === 'add') {
			cloneAction();
		}
	}
	function handleMinusClick(val) {
		if (mode === 'add') {
			deleteAction(val);
		}
	}

	function handleKeyPress(e) { }



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
							noBorder
							bgAdminLayer
							value={value}
							handleChange={e => handleChange(name, e)}
							handleKeyPress={getKey}
						/>
						<Button hidden name={name} type="plain" equalPadding action={handleAddClick} ref={btn} ><AddICO /></Button>
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