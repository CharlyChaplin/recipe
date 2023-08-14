import React from 'react';
import { NoDataIcon, NoDataText, NoDataWrapper } from './styled';
import { ReactComponent as ICO } from 'assets/img/nodata/failure.svg';


const NoData = () => {
	return (
		<>
			<NoDataWrapper>
				<NoDataIcon><ICO /></NoDataIcon>
				<NoDataText text="Нет данных" />
			</NoDataWrapper>
		</>
	);
}

export default NoData;