import React, { useEffect } from 'react';
import { MainWrapper } from 'pages/pages.styled';
import vars from 'init/vars';
import bg from 'assets/img/main/bg.jpg';
import { InnerWrapperForMain, MainHeader, QuotationWrapper, SearchBar } from './styled';
import { useState } from 'react';
import SearchPanel from './components/SearchPanel/SearchPanel';
import Quotation from './components/Quotation/Quotation';
import { useDispatch } from 'react-redux';
import { clearPhraseData } from 'redux/slices/phraseSlice';
import { Helmet } from 'react-helmet';

// const titlePage = "Заголовок";
const titlePage = "Рецепты для удовольствия!";


const HomePage = () => {
	const dispatch = useDispatch();
	const [showQuotation, setShowQuotation] = useState(true);

	const showQuotationFunc = val => setShowQuotation(val);

	useEffect(() => {


		return () => dispatch(clearPhraseData());
	}, []);



	return (
		<>
			<Helmet>
				<title>{titlePage}</title>
				<meta name="description" content="Recipes, Search recipes, Main Page, Random Phrases"></meta>
			</Helmet>
			<MainWrapper image={bg}>
				<InnerWrapperForMain>

					<MainHeader color={vars.whiteColor}>{titlePage}</MainHeader>

					<SearchBar>
						<SearchPanel showQuotationFunc={showQuotationFunc} />
					</SearchBar>

					{
						showQuotation && <QuotationWrapper><Quotation /></QuotationWrapper>
					}

				</InnerWrapperForMain>
			</MainWrapper>
		</>
	);
}

export default HomePage;