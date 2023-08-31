import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomPhrase } from 'redux/slices/phraseSlice';
import { Quote, QuoteWrapper, QuotePhrase } from './styled';


const Quotation = () => {
	const { phraseData, errors, phraseLoading } = useSelector(state => state.phraseReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getRandomPhrase());
	}, []);




	return (
		<>
			{
				!errors.length && !phraseLoading && !!phraseData.length &&

				<Quote>
					<QuoteWrapper>
						<QuotePhrase text={phraseData} />
					</QuoteWrapper>
				</Quote>
			}

		</>
	);
}

export default Quotation;