import Input from 'components/Input/Input';
import React from 'react';
import { IngredientItemWrapper } from './styled';
import { useState } from 'react';
import Button from 'components/Button/Button';
import { ReactComponent as MinusICO } from 'assets/img/icons/minus.svg';
import { useWhyDidYouUpdate } from 'ahooks';


// mode = 'change' || 'add' || 'view'
const IngredientItem = ({ mode, locked, data, data1, name, deleteAction, value, value1, handleChange, handleChange1, getKey }) => {

	// useWhyDidYouUpdate('IngredientItem', { mode, data, name, cloneAction, deleteAction, value, handleChange, getKey });





	switch (mode) {
		case 'change':
			return (
				<>
					<IngredientItemWrapper>
						<div>
							{
								data !== false &&
								<>
									<Input
										name={name}
										placeholder={data === false ? '' : data}
										rectangle
										fz={12}
										value={value}
										disabled={data === false || locked === true}
										handleChange={e => handleChange(name, e)}
									/>

									<span>Заменить на</span>
								</>
							}

							<Input
								placeholder={data === false ? 'новый ингредиент...' :data1}
								name={name}
								rectangle
								fz={12}
								value={value1}
								handleChange={e => handleChange1(name, e)}
							/>
						</div>
						<Button type="plain" equalPadding action={deleteAction}><MinusICO /></Button>
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
						<Button type="plain" equalPadding action={deleteAction}><MinusICO /></Button>
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