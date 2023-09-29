import React, { memo } from 'react';
import NoFound from './components/NoFound/NoFound';
import { SearchResultBlock, SearchResultCategoryCaption, SearchResultComponent, SearchResultFindItemList, SearchResultItem, SearchResultWrapper } from './styled';
import { nanoid } from 'nanoid';


const SearchResult = memo(({ categoryFounded, blogFounded }) => {
	
	return (
		<>
			<SearchResultComponent>
				<SearchResultWrapper>

					<SearchResultBlock>
						<SearchResultCategoryCaption categoryName="РЕЦЕПТЫ" />

						<SearchResultFindItemList>
							{
								categoryFounded?.length
									? categoryFounded.map(({ image, description, link }) => {
										return (
											<SearchResultItem
												key={nanoid()}
												image={image}
												description={description}
												link={link}
											/>
										)
									})
									: <NoFound />
							}
						</SearchResultFindItemList>

					</SearchResultBlock>

					<hr />

					<SearchResultBlock>
						<SearchResultCategoryCaption categoryName="БЛОГ" />
						<SearchResultFindItemList>
							{
								blogFounded?.length
									? blogFounded.map(({ image, description, link }) => {
										return (
											<SearchResultItem
												key={nanoid()}
												image={image}
												description={description}
												link={link}
											/>
										)
									})
									: <NoFound />
							}
						</SearchResultFindItemList>
					</SearchResultBlock>

				</SearchResultWrapper>
			</SearchResultComponent>
		</>
	);
});

export default SearchResult;