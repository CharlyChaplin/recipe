import React from 'react';
import { MainWrapper } from 'pages/pages.styled';
import bg from 'assets/img/about/bg.jpg';


const AboutPage = () => {
	return (
		<>
			<MainWrapper image={bg} noOverlay>
				About
			</MainWrapper>
		</>
	);
}

export default AboutPage;