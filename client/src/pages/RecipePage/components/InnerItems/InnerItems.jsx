import SectionHeader from 'components/SectionHeader/SectionHeader';
import Spinner from 'components/Spinner/Spinner';
import vars from 'init/vars';
import { ButtonBtn, ContentPaddingTop, ContentWrapper, InnerWrapper } from 'pages/pages.styled';
import React from 'react';
import PreviewItem from '../PreviewItem/PreviewItem';
import { nanoid } from 'nanoid';
import NoData from 'components/NoData/NoData';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';


const InnerItems = ({ backBtn, headerCaption, items, loadStatus }) => {
	const navigate = useNavigate();
	console.log("items=", items);

	return (
		<>
			<InnerWrapper>
				{
					backBtn && <ButtonBtn handleaction={() => navigate(paths.categories)} />
				}
				<ContentPaddingTop />
				<SectionHeader color={vars.whiteColor}>{headerCaption}</SectionHeader>

				{
					loadStatus
						? <ContentWrapper spiner><Spinner height={100} /></ContentWrapper>
						: <>
							{
								items?.length > 0
									? <ContentWrapper>
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
									</ContentWrapper>
									: <ContentWrapper spiner><NoData /></ContentWrapper>
							}
						</>


				}
			</InnerWrapper>
		</>
	);
}

export default InnerItems;