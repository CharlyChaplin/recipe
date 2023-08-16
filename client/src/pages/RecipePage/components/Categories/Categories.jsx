import React from 'react';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { ContentPaddingTop, ContentWrapper, InnerWrapper } from 'pages/pages.styled';
import Spinner from 'components/Spinner/Spinner';
import NoData from 'components/NoData/NoData';
import { useSelector } from 'react-redux';
import PreviewItem from '../PreviewItem/PreviewItem';
import { nanoid } from 'nanoid';


const Categories = ({ items }) => {
	const { loading } = useSelector(state => state.recipeReducer);

	return (
		<>
			<InnerWrapper>
				<ContentPaddingTop />
				<SectionHeader color={vars.whiteColor}>Рецепты по категориям</SectionHeader>

				{
					loading
						? <ContentWrapper spiner><Spinner height={100} /></ContentWrapper>
						: <>
							{
								items.length > 0
									? <ContentWrapper>
										{
											items.map(item => {
												return (
													
													<PreviewItem
														key={nanoid()}
														url={`/recipe/category/${item.categoryname}`}
														image={item.photopreview}
														imageAlt={item.caption}
														description={item.caption}
													/>
												)
											})
										}
									</ContentWrapper>
									: <ContentWrapper spiner><NoData /></ContentWrapper>
							}
						</>


				}
			</InnerWrapper>


		</>
	);
}

export default Categories;