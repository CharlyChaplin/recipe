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
import { blogAddBlog } from 'redux/slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { datePrepare } from 'utils/datePrepare';
import { showInfo } from 'redux/slices/infoSlice';


const BlogAddPage = () => {
	const { userData, errors } = useSelector(state => state.userReducer);
	const { blogData, loading } = useSelector(state => state.blogReducer);
	const [fields, setFields] = useState({
		dateadd: '',
		owner: '',
		caption: '',
		description: '',
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		setFields({ ...fields, dateadd: datePrepare(Date.now()), owner: userData?.user?.nickname });
		if (blogData?.id && !loading) navigate(`/blog/${blogData.id}`);
	}, [blogData]);

	

	const changeInput = useCallback((e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value
		});
	}, [fields]);


	async function handleApplyBlog() {
		const fd = new FormData();
		const filledData = Object.entries(fields).filter(item => item[1].length > 0);
		const { dateadd, owner, caption, description } = Object.fromEntries(filledData);
		if (dateadd?.length > 0) fd.append('dateadd', fields.dateadd);
		if (owner?.length > 0) fd.append('owner', fields.owner);
		if (caption?.length > 0) fd.append('caption', fields.caption);
		if (description?.length > 0) fd.append('description', fields.description);

		if (!(dateadd && owner && caption && description)) {
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

						<BlogAddPhoto />

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