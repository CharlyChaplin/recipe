import React from 'react';
import {ReactComponent as NotFoundICO} from 'assets/img/search/failure.svg';
import { SearchNotFound, SearchNotFoundDescription, SearchNotFoundImageBlock } from './styled';


const NoFound = () => {
	return (
		<>
			<SearchNotFound>
				<SearchNotFoundImageBlock><NotFoundICO /></SearchNotFoundImageBlock>
				<SearchNotFoundDescription text="Ничего не найдено" />
			</SearchNotFound>
		</>
	);
}

export default NoFound;