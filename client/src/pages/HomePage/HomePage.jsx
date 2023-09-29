import React, { useEffect } from 'react';
import { MainWrapper } from 'pages/pages.styled';
import SectionHeader from 'components/SectionHeader';
import vars from 'init/vars';
import bg from 'assets/img/main/bg.jpg';
import { InnerWrapperForMain, QuotationWrapper, SearchBar } from './styled';
import { useState } from 'react';
import SearchPanel from './components/SearchPanel/SearchPanel';
import Quotation from './components/Quotation/Quotation';
import { useDispatch } from 'react-redux';
import { clearPhraseData } from 'redux/slices/phraseSlice';

const titlePage = "Заголовок";
// const titlePage = "Рецепты для удовольствия!";


const HomePage = () => {
	const dispatch = useDispatch();
	const [showQuotation, setShowQuotation] = useState(true);

	const showQuotationFunc = val => setShowQuotation(val);

	useEffect(() => {
		
		
		return () => dispatch(clearPhraseData());
	}, []);



	return (
		<>
			<MainWrapper image={bg}>
				<InnerWrapperForMain>

					<SectionHeader color={vars.whiteColor}>{titlePage}</SectionHeader>

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