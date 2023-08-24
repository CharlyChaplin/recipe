import React, { useEffect, useState } from 'react';
import bg from 'assets/img/category/soups/bg.jpg';
import { ContentPaddingTop, EditNotEdit, InnerWrapper, MainWrapper } from 'pages/pages.styled';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { ContentWrapperChangedForRecipeEdit, RecipeEditTop } from 'pages/RecipeEditPage/styled';
import { useSelector } from 'react-redux';
import { datePrepare } from 'utils/datePrepare';




const RecipeAddPage = () => {
	const [fields, setFields] = useState({
		dateadd: '',
		owner: '',
		picture: '',
		caption: '',
		shortDescription: '',
		ingredients: [],
		category: '',
		cookingText: '',
		oldRecipeCaption: ''
	});
	const { userData, errors } = useSelector(state => state.userReducer);

	useEffect(() => {
		setFields({ ...fields, dateadd: datePrepare(Date.now()), owner: userData?.user?.nickname });


	}, [userData]);

	return (
		<>
			<MainWrapper image={bg}>

				<InnerWrapper>

					<SectionHeader color={vars.whiteColor}><ContentPaddingTop />Добавляем рецепт</SectionHeader>
					<ContentWrapperChangedForRecipeEdit>

						<RecipeEditTop>
							<EditNotEdit data={fields.dateadd} />
							<EditNotEdit data={fields.owner} />
						</RecipeEditTop>

					</ContentWrapperChangedForRecipeEdit>

				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default RecipeAddPage;