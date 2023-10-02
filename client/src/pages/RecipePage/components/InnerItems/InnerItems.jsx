import React from 'react';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import Spinner from 'components/Spinner/Spinner';
import vars from 'init/vars';
import { ButtonBtn, ContentWrapper } from 'pages/pages.styled';
import { ContentWrapperForCategories, InnerWrapperForCategories } from './styled';
import PreviewItem from '../PreviewItem/PreviewItem';
import { nanoid } from 'nanoid';
import NoData from 'components/NoData/NoData';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';
import { Helmet } from 'react-helmet';


const InnerItems = ({ backBtn, headerCaption, items, loadStatus }) => {
	const navigate = useNavigate();
	

	return (
		<>
			<Helmet>
				{/* <title>{headerCaption}</title> */}
				<meta name="description" content="Recipes, Category of recipe one page"></meta>
			</Helmet>
			<InnerWrapperForCategories>
				{
					backBtn && <ButtonBtn handleaction={() => navigate(paths.categories)} />
				}
				<SectionHeader backBtnExists={backBtn} color={vars.whiteColor}>{headerCaption}</SectionHeader>

				{
					loadStatus
						? <ContentWrapperForCategories spiner><Spinner height={100} /></ContentWrapperForCategories>
						: <>
							{
								items?.length > 0
									? <ContentWrapperForCategories>
										{
											items.map(item => {
												return (

													<PreviewItem
														key={nanoid()}
														url={item.url}
														image={item.photopreview}
														imageAlt={item.caption}
														description={item.caption}
													/>
												)
											})
										}
									</ContentWrapperForCategories>
									: <ContentWrapper spiner><NoData /></ContentWrapper>
							}
						</>


				}
			</InnerWrapperForCategories>
		</>
	);
}

export default InnerItems;