import React from 'react';
import { FooterAbout, FooterContainer, FooterIco, FooterWrapper, FooterYear } from './styled';
import Logo from 'components/Logo';
import { Link } from 'react-router-dom';
import { paths } from 'routes/helper';


const Footer = () => {
	return (
		<>
			<FooterWrapper>
				<FooterContainer>
					
					<FooterIco><Logo noText /></FooterIco>
					<FooterAbout><Link to={paths.about} aria-label='О проекте'>О проекте</Link></FooterAbout>
					<FooterYear />
					
				</FooterContainer>
			</FooterWrapper>
		</>
	);
}

export default Footer;