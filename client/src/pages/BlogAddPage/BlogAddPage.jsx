import React from 'react';
import bg from 'assets/img/blog/bg.jpg';
import { ContentPaddingTop, InnerWrapper, MainWrapper } from 'pages/pages.styled';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import { BlogEditButtonWrapper, BlogEditCaption, BlogEditNotEdit, BlogEditTextWrapper, BlogEditTop, ContentWrapperChangedForBlogEdit, Divisor } from 'pages/BlogEditPage/styled';
import Input from 'components/Input/Input';
import { useState } from 'react';
import { useCallback } from 'react';
import { BlogAddPhoto } from './styled';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { blogAddBlog, clearBlogData } from 'redux/slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { datePrepare } from 'utils/datePrepare';
import { showInfo } from 'redux/slices/infoSlice';
import ImageInsert from 'components/ImageInsert/ImageInsert';


const BlogAddPage = () => {
	const { userData, errors } = useSelector(state => state.userReducer);
	const { blogData, loading, completed } = useSelector(state => state.blogReducer);
	const [fields, setFields] = useState({
		dateadd: '',
		picture: '',
		caption: '',
		description: '',
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		setFields({ ...fields, dateadd: datePrepare(Date.now()) });

	}, [blogData]);

	useEffect(() => {
		if (completed) {
			dispatch(clearBlogData());
			navigate(`/blog/${blogData.id}`);
		};
	}, [completed]);


	function getSelectedFile(pictureFile) {
		setFields({ ...fields, picture: pictureFile });
	}

	const changeInput = useCallback((e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value
		});
	}, [fields]);


	async function handleApplyBlog() {
		const filledData = Object.entries(fields).filter(item => item[1]?.length > 0);
		const { dateadd, caption, description } = Object.fromEntries(filledData);

		const fd = new FormData();
		if (dateadd?.length > 0) fd.append('dateadd', fields.dateadd);
		fd.append('file', fields.picture);
		if (caption?.length > 0) fd.append('caption', fields.caption);
		if (description?.length > 0) fd.append('description', fields.description);

		if (!(dateadd && fields.picture && caption && description)) {
			dispatch(showInfo({ text: "Заполните все поля", cancel: true }))
			return;
		}

		try {
			dispatch(blogAddBlog(fd));
			setTimeout(() => {
				if (errors.length > 0 && !loading) {
					dispatch(showInfo({ text: errors, cancel: true }));
				} else {
					dispatch(showInfo({ text: "Блог успешно добавлен", ok: true }));
				}
			}, 300);
		} catch (error) {
			console.log("Error: ", error);
		}
	};



	return (
		<>
			<MainWrapper image={bg}>

				<InnerWrapper>
					<SectionHeader color={vars.whiteColor}><ContentPaddingTop />Добавляем блог</SectionHeader>
					<ContentWrapperChangedForBlogEdit>


						<BlogEditTop>
							<Input name='dateadd' value={fields.dateadd} handleChange={changeInput} autoFocus center placeholder="Дата создания..." />
							<Divisor />
							<BlogEditNotEdit data={userData?.user?.nickname} />
						</BlogEditTop>

						<BlogAddPhoto>
							<ImageInsert selectedFile={getSelectedFile} />
						</BlogAddPhoto>

						<BlogEditCaption>
							<Input name='caption' value={fields.caption} handleChange={changeInput} center placeholder="Название блога..." />
						</BlogEditCaption>

						<BlogEditTextWrapper>
							<Input type='textarea' name='description' value={fields.description} handleChange={changeInput} center placeholder="Текст блога..." />
						</BlogEditTextWrapper>
						<BlogEditButtonWrapper>
							<Button action={handleApplyBlog}>Добавить</Button>
							<Button action={() => navigate(-1)}>Отмена</Button>
						</BlogEditButtonWrapper>

					</ContentWrapperChangedForBlogEdit>

				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default BlogAddPage;