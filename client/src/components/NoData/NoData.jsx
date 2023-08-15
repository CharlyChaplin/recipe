import React from 'react';
import { NoDataIcon, NoDataText, NoDataWrapper } from './styled';
import { ReactComponent as ICO } from './img/failure.svg';


const NoData = ({ text }) => {
	return (
		<>
			<NoDataWrapper>
				<NoDataIcon><ICO /></NoDataIcon>
				<NoDataText text={text ? text : "Нет данных"} />
			</NoDataWrapper>
		</>
	);
}

export default NoData;