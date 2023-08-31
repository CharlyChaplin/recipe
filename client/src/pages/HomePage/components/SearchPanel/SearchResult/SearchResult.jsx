import React from 'react';
import NoFound from './components/NoFound/NoFound';
import { SearchResultBlock, SearchResultCategoryCaption, SearchResultFindItemList, SearchResultItem, SearchResultWrapper } from './styled';


const SearchResult = ({ categoryFounded, blogFounded }) => {
	return (
		<>
			<SearchResult>
				<SearchResultWrapper>

					<SearchResultBlock>
						<SearchResultCategoryCaption categoryName="СУПЫ" />

						<SearchResultFindItemList>
							{
								categoryFounded?.length
									? categoryFounded.map(({ image, description }) => {
										return (
											<SearchResultItem
												image={image}
												description={description}
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
									? blogFounded.map(({ image, description }) => {
										return (
											<SearchResultItem
												image={image}
												description={description}
											/>
										)
									})
									: <NoFound />
							}
						</SearchResultFindItemList>
					</SearchResultBlock>

				</SearchResultWrapper>
			</SearchResult>

		</>
	);
}

export default SearchResult;