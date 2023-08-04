import React from 'react';
import DropdownList from 'components/DropdownList';
import { ModalContentWrapper } from 'pages/ProfilePage/components/styled';
import { ReactComponent as EditICO } from 'assets/img/icons/edit.svg';
import { ReactComponent as DeleteICO } from 'assets/img/icons/trash.svg';
import { useContext } from 'react';
import { DataContext } from 'pages/ProfilePage/context';
import { useCallback } from 'react';
import axios from 'axiosSetup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { blogGetBlog, blogGetBlogs } from 'redux/slices/blogSlice';
import { showInfo } from 'redux/slices/infoSlice';
import { useNavigate } from 'react-router-dom';
import { paths } from 'routes/helper';


const BlogDeleteChange = () => {
	let modalStore = useContext(DataContext);
	const [selected, setSelected] = useState('');
	const [inputText, setInputText] = useState(selected);

	const { userData } = useSelector(state => state.userReducer);
	const { blogData, blogs } = useSelector(state => state.blogReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();


	function handleSelected(val) {
		setSelected(val);
		modalStore.selectBlogForDelete(val);
	}

	const handleEditAction = useCallback(() => {
		if (confirm("Перейти на страницу изменения блога?")) {
			dispatch(blogGetBlog({ blogCaption: selected }));
			navigate(paths.blogedit);
		}
	}, [selected]);

	// обработка действия при удалении блога
	const handleDeleteAction = useCallback(async () => {
		if (confirm("Удаляем блог из базы данных?")) {
			try {
				const resp = await axios.post('/blog/delete', { caption: modalStore.selectedBlogForDelete });

				if (resp.data) {
					dispatch(showInfo({ text: `Блог "${resp.data}" был удалён.`, ok: true }));
				}
				setInputText('');		// сбрасываем состояние выбранности DropListBox
				setSelected('');		// блокируем кнопки удаления/изменения
				dispatch(blogGetBlogs());	// получаем заного оставшиеся фразы
			} catch (error) {
				dispatch(showInfo({ text: `Ошибка при удалении (${error.response.data.detail})`, cancel: true }));
			}

		}
	}, [dispatch]);



	return (
		<>
			<ModalContentWrapper>
				<DropdownList
					elements={blogs ? blogs : []}
					labelText="Название блога:"
					placeholder={userData?.user?.rolelat === 'admin' ? 'Выберите из существующего...' : 'Выберите из созданного вами...'}
					labelPos="row"
					inputText={inputText}
					setInputText={setInputText}
					selectedValue={handleSelected}
					buttonEditIcon={<EditICO />}
					buttonEditAction={handleEditAction}
					buttonEditDisabled={!selected.length > 0}
					buttonDeleteIcon={<DeleteICO />}
					buttonDeleteAction={handleDeleteAction}
					buttonDeleteDisabled={!selected.length > 0}
				/>
			</ModalContentWrapper>
		</>
	);
}

export default BlogDeleteChange;