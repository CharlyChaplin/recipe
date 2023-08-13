import React, { useCallback, useState } from 'react';
import { ContentPaddingTop, InnerWrapper, MainWrapper } from 'pages/pages.styled';
import { useDispatch, useSelector } from 'react-redux';
import bg from 'assets/img/blogedit/bg.jpg';
import { useEffect } from 'react';
import Spinner from 'components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { BlogEditButtonWrapper, BlogEditCaption, BlogEditNotEdit, BlogEditPhoto, BlogEditTextWrapper, BlogEditTop, ContentWrapperChangedForBlogEdit, Divisor } from './styled';
import Button from 'components/Button/Button';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import vars from 'init/vars';
import Input from 'components/Input/Input';
import { blogEditBlog } from 'redux/slices/blogSlice';
import { showInfo } from 'redux/slices/infoSlice';
import DropdownList from 'components/DropdownList'
import { userGetUsersNickname } from 'redux/slices/userSlice';


let dataSource;

const BlogEditPage = () => {
	const [fields, setFields] = useState({
		dateadd: '',
		owner: '',
		caption: '',
		description: '',
		oldBlogCaption: ''
	});
	const { userData, users, usersName } = useSelector(state => state.userReducer);
	const { blogData, loading, errors } = useSelector(state => state.blogReducer);
	const [selected, setSelected] = useState('');
	const [inputText, setInputText] = useState(selected);
	const [receivedData, setReceivedData] = useState();	// для перерисовки компонента
	const navigate = useNavigate();
	const dispatch = useDispatch();


	useEffect(() => {
		getBlog();
		if (userData?.user?.role === 1) dispatch(userGetUsersNickname());


		dataSource = Object.keys(blogData).length ? blogData : JSON.parse(localStorage.getItem('blogEdit') || null);
		setInputText(blogData.name);
		setFields({ ...fields, oldBlogCaption: dataSource?.caption });

		if (blogData[0]?.id) navigate(`/blog/${blogData[0].id}`);

		return () => localStorage.removeItem('blogEdit');
	}, [blogData]);

	const getBlog = useCallback(() => {
		if (Object.keys(blogData).length) {
			setReceivedData(blogData);
			localStorage.setItem('blogEdit', JSON.stringify(blogData));
		} else if (Array.from(blogData).length === 0) {
			setReceivedData(JSON.parse(localStorage.getItem('blogEdit') || null));
		}
	}, [blogData]);


	function handleSelected(val) {
		setSelected(val);
		setFields({ ...fields, owner: val });
	}

	const changeInput = useCallback((e) => {
		setFields({
			...fields,
			[e.target.name]: e.target.value
		});
	}, [fields]);

	async function handleApplyBlog() {
		const fd = new FormData();
		const filledData = Object.entries(fields).filter(item => item[1].length > 0);
		const { dateadd, owner, caption, description, oldBlogCaption } = Object.fromEntries(filledData);
		if (dateadd?.length > 0) fd.append('dateadd', fields.dateadd);
		if (owner?.length > 0) fd.append('owner', fields.owner);
		if (caption?.length > 0) fd.append('caption', fields.caption);
		if (description?.length > 0) fd.append('description', fields.description);
		if (oldBlogCaption?.length > 0) fd.append('oldBlogCaption', fields.oldBlogCaption);


		try {
			dispatch(blogEditBlog(fd));
			setTimeout(() => {
				if (errors.length > 0 && !loading) {
					dispatch(showInfo({ text: errors, cancel: true }));
				} else {
					dispatch(showInfo({ text: "Блог успешно обновлён", ok: true }));
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
					<SectionHeader color={vars.whiteColor}><ContentPaddingTop />Изменяем блог</SectionHeader>
					<ContentWrapperChangedForBlogEdit>
						{
							loading
								? <Spinner height={100} />
								: <>
									<BlogEditTop>
										{
											userData?.user?.role === 1
												? <Input name='dateadd' value={fields.dateadd} handleChange={changeInput} autoFocus center placeholder={dataSource?.dateadd} />
												: <BlogEditNotEdit data={dataSource?.dateadd} />
										}
										<Divisor />
										{
											userData?.user?.role === 1
												? <DropdownList elements={usersName} placeholder='Выберите пользователя...' selectedValue={handleSelected} inputText={inputText} setInputText={setInputText} />
												: <BlogEditNotEdit data={dataSource?.name} />
										}
									</BlogEditTop>
									<BlogEditPhoto image={dataSource?.photopreview} imageAltText={dataSource?.caption} />
									<BlogEditCaption>
										{
											userData?.user?.role === 1
												? <Input name='caption' value={fields.caption} handleChange={changeInput} center placeholder={dataSource?.caption} />
												: <BlogEditNotEdit data={dataSource?.caption} isCaption />
										}
									</BlogEditCaption>
									<BlogEditTextWrapper>
										<Input type='textarea' name='description' value={fields.description} handleChange={changeInput} center placeholder={dataSource?.description} />
									</BlogEditTextWrapper>
									<BlogEditButtonWrapper>
										<Button action={handleApplyBlog}>Изменить</Button>
										<Button action={() => navigate(-1)}>Отмена</Button>
									</BlogEditButtonWrapper>
								</>
						}

					</ContentWrapperChangedForBlogEdit>
				</InnerWrapper>

			</MainWrapper>
		</>
	);
}

export default BlogEditPage;