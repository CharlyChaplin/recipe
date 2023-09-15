import React, { useEffect, useRef, useState } from 'react';
import SearchDescription from '../SearchDescription';
import ExapmlePlaceholder from './components/ExamplePlaceholder';
import SearchResult from './SearchResult';

import { SearchMainForm, SearchMainFormButton, SearchMainFormClear, SearchMainFormInput, SearchMainFormInputWrapper, SearchMainFormPlaceholderBox } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'components/Spinner/Spinner';
import vars from 'init/vars';
import { ReactComponent as LensICO } from 'assets/img/icons/search-ico.svg';
import { ReactComponent as ClearICO } from 'assets/img/icons/clear-button.svg';
import { clearSearchResult, searchQuery } from 'redux/slices/searchSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


let query;

const SearchPanel = ({ showQuotationFunc }) => {
	const { searching, searchResult } = useSelector(state => state.searchReducer);
	const dispatch = useDispatch();
	const location = useLocation();
	const params = useParams();
	const navigate = useNavigate();


	const [searchValue, setSearchValue] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const inputRef = useRef();


	useEffect(() => {
		query = new URLSearchParams(location.search);
		// если есть запрос из строки адреса, то заполняем строку поиска
		// и показываем панель результата
		if (query.get('q')?.length) {
			setSearchValue(query.get('q'));
			setShowSearch(true);
		};
		if (location.search) {
			dispatch(searchQuery(searchValue || location.search.replace('?q=', '')));
		}

		showQuotationFunc(!showSearch);
	}, [showSearch, params, navigate]);

	// отображаем результаты поиска в зависимости от наличия текста в input
	function searchAction() {
		navigate(location.pathname.concat(searchValue.length ? `?q=${searchValue}` : ''));
		setShowSearch(searchValue.length !== 0);
	}

	const searchActionKeyDown = e => e.key == "Enter" && searchAction();

	function clearSearch() {
		if (searchValue) {
			setSearchValue("");
			setShowSearch(false);
			dispatch(clearSearchResult());
			navigate('/');
		}
	}

	function handleSearchInput(e) {
		setSearchValue(e.target.value);	// устанавливаем значение в input
	}

	function changeSpan(text) {
		setSearchValue(text);
	}

	function dblClick() {
		inputRef.current.select();
	}

	function handleButtonSearch() {
		if (searchValue) searchAction();
	}






	return (
		<>
			<SearchMainForm>

				<SearchDescription text="Что вы желаете сегодня?" />

				<SearchMainFormInputWrapper>
					<SearchMainFormPlaceholderBox onDoubleClick={dblClick} showSearch={showSearch}>
						<input
							ref={inputRef}
							required
							type="text"
							autoFocus
							value={searchValue}
							onChange={handleSearchInput}
							onKeyDown={searchActionKeyDown}
						/>
						<ExapmlePlaceholder text='Борщ' changeSpan={changeSpan} />

						<SearchMainFormClear onClick={clearSearch}>{<ClearICO />}</SearchMainFormClear>

						<SearchMainFormButton onClick={handleButtonSearch} showSearch={showSearch}>
							{
								searching
									? <Spinner color={vars.text} height={24} />
									: <LensICO />
							}
						</SearchMainFormButton>
					</SearchMainFormPlaceholderBox>

					{
						(showSearch || Object.values(searchResult).length > 0) &&
						<SearchResult categoryFounded={searchResult.category} blogFounded={searchResult.blog} />
					}

				</SearchMainFormInputWrapper>

			</SearchMainForm>
		</>
	);
}

export default SearchPanel;