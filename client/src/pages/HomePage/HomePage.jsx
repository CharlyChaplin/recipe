import React from 'react';
import { ContentPaddingTop, ContentWrapper, InnerWrapper, MainWrapper } from 'pages/pages.styled';
import ImageInsert from 'components/ImageInsert/ImageInsert';



const HomePage = () => {
	return (
		<>
			<MainWrapper>
				<InnerWrapper>
					<ContentPaddingTop />
					<ContentWrapper>
						
						<ImageInsert />
						
					</ContentWrapper>
				</InnerWrapper>
			</MainWrapper>
		</>
	);
}

export default HomePage;