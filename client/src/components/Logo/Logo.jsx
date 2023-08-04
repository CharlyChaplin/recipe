import React from 'react';
import { ReactComponent as LogoICO } from 'assets/img/logo/logo.svg';
import { LogoDescriptionBottom, LogoDescriptionTop, LogoDescriptionWrapper, LogoDivisor, LogoIcon, LogoWrapper } from './styled';


const Logo = ({ noIcon = false, noText = false }) => {
	return (
		<>
			<LogoWrapper>
				{
					!noIcon &&
					<LogoIcon>{<LogoICO />}</LogoIcon>
				}

				{
					(!noIcon && !noText) && <LogoDivisor />
				}

				{
					!noText &&
					<LogoDescriptionWrapper>
						<LogoDescriptionTop>Готовим</LogoDescriptionTop>
						<LogoDescriptionBottom>Вместе</LogoDescriptionBottom>
					</LogoDescriptionWrapper>
				}
			</LogoWrapper>
		</>
	);
}

export default Logo;