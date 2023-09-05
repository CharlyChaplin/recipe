import React from 'react';
import { HeaderAuth, HeaderContainer, HeaderLogo, HeaderMenu, HeaderTop, HeaderWrapper } from './styled';
import Logo from 'components/Logo';
import Menu from 'components/Menu';
import AuthButton from './components/AuthButton/AuthButton';


const Header = () => {

	return (
		<>
			<HeaderWrapper>
				<HeaderContainer>
					<HeaderTop>
						<HeaderLogo><Logo /></HeaderLogo>
						<HeaderMenu><Menu /></HeaderMenu>
						<HeaderAuth>
							<AuthButton />
						</HeaderAuth>
					</HeaderTop>
				</HeaderContainer>
			</HeaderWrapper>
		</>
	);
}

export default Header;