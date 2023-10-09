import React from 'react';
import { InnerWrapper, MainWrapper } from 'pages/pages.styled';
import vars from 'init/vars';
import { AboutCaption, AboutContent, AboutDescription, AboutSocials, AboutTechnologies, AboutWrapper } from './styled';
import { ReactComponent as GithubICO } from 'assets/img/icons/github.svg';
import { Helmet } from 'react-helmet';


const AboutPage = () => {
	return (
		<>
			<Helmet>
				<title>О проекте</title>
				<meta name="description" content="Recipes, About page"></meta>
			</Helmet>
			<MainWrapper image={vars.overlay} noOverlay>
				<InnerWrapper>

					<AboutWrapper>
						<AboutContent>

							<AboutCaption>О проекте</AboutCaption>
							<AboutDescription>Pet-проект. SPA full-stack приложение по работе с кулинарными рецептами. Реализована админ-панель. Все компоненты дизайна и панели управления самописны. Sequalize для работы с БД не использовался, т.к. было желание поработать с запросами напрямую. Авторизация использует два токена - 'access' и 'refresh'</AboutDescription>
							<AboutTechnologies
								caption="Frontend-часть:"
								items={[
									'HTML',
									'CSS (Styled Components + адаптивный дизайн)',
									'React JS'
								]}
							/>
							<AboutTechnologies
								caption="Backtend-часть:"
								items={[
									'Node JS',
									'Express',
									'PostgreSQL'
								]}
							/>

							<hr />

							<AboutSocials
								items={[
									{ icon: <GithubICO />, link: "https://github.com/CharlyChaplin/recipe.git", alt: "github" },
								]}
							/>

						</AboutContent>
					</AboutWrapper>

				</InnerWrapper>
			</MainWrapper>
		</>
	);
}

export default AboutPage;