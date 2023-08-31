import React from 'react';
import pic from 'assets/img/search/failure.svg';
import { SearchNotFound, SearchNotFoundDescription, SearchNotFoundImageBlock } from './styled';


const NoFound = () => {
	return (
		<>
			<SearchNotFound>
				<SearchNotFoundImageBlock image={pic} alt="pic" />
				<SearchNotFoundDescription text="Ничего не найдено" />
			</SearchNotFound>
		</>
	);
}

export default NoFound;