import React, { useEffect, useRef, useState } from 'react';
import SearchDescription from '../SearchDescription';
import ExapmlePlaceholder from './components/ExamplePlaceholder';
import SearchResult from './SearchResult';

import { SearchMainForm, SearchMainFormButton, SearchMainFormClear, SearchMainFormInput, SearchMainFormInputWrapper, SearchMainFormPlaceholderBox } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'components/Spinner/Spinner';
import vars from 'init/vars';
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
		// если есть запрос из строки адреса, то запускаем заполняем строку поиска
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
		navigate(location.pathname + `?q=${searchValue}`);
		setShowSearch(searchValue.length !== 0);
	}

	const searchActionKeyDown = e => e.key == "Enter" && searchAction();

	function clearSearch(e) {
		setSearchValue("");
		setShowSearch(false);
		dispatch(clearSearchResult());
		navigate('/');
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


	console.log(showSearch, Object.values(searchResult).length > 0);



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

						<SearchMainFormClear onClick={clearSearch}>
							<svg width="17" height="17" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<path d="m2.5 1a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5zm0-1h12a2.5 2.5 0 0 1 2.5 2.5v12a2.5 2.5 0 0 1-2.5 2.5h-12a2.5 2.5 0 0 1-2.5-2.5v-12a2.5 2.5 0 0 1 2.5-2.5zm5.328 8.536-3.182-3.182a0.50063 0.50063 0 1 1 0.708-0.708l3.182 3.182 3.182-3.182a0.50028 0.50028 0 0 1 0.707 0.708l-3.182 3.182 3.182 3.182a0.5 0.5 0 0 1-0.707 0.707l-3.182-3.182-3.182 3.182a0.50028 0.50028 0 0 1-0.708-0.707z" />
							</svg>
						</SearchMainFormClear>

						<SearchMainFormButton onClick={searchAction} showSearch={showSearch}>
							{
								searching
									? <Spinner color={vars.text} height={24} />
									: <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
										<path d="M0.195286 29.9193L9.49106 20.6236C7.6626 18.375 6.66509 15.5649 6.66662 12.6667C6.66662 5.68233 12.3489 0 19.3333 0C26.3177 0 32 5.68233 32 12.6667C32 19.6511 26.3177 25.3334 19.3333 25.3334C16.4351 25.3349 13.625 24.3374 11.3764 22.509L2.08067 31.8048C1.95562 31.9298 1.78604 32 1.60923 32C1.43241 32 1.26284 31.9298 1.13779 31.8048L0.195225 30.8621C0.0702126 30.7371 -1.15165e-05 30.5675 1.41662e-09 30.3907C1.15193e-05 30.2139 0.0702576 30.0443 0.195286 29.9193ZM19.3333 22.6667C24.8476 22.6667 29.3333 18.181 29.3333 12.6667C29.3333 7.15239 24.8476 2.66669 19.3333 2.66669C13.8189 2.66669 9.33325 7.15239 9.33325 12.6667C9.33325 18.181 13.8187 22.6667 19.3333 22.6667Z" />
									</svg>
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