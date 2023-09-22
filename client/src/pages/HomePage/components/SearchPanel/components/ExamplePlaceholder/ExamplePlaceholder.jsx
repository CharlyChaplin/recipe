import React, { useEffect, useState } from 'react';
import { Example, PlaceholderText } from './styled';

const width = '450px';



const ExapmlePlaceholder = ({ text = "Супы", changeSpan }) => {
	const [isNarrowScreen, setIsNarrowScreen] = useState(matchMedia(`max-width: ${width}`).matches);

	const mediaWatcher = window.matchMedia(`(max-width: ${width})`);
	const updateIsNarrowScreen = (e) => setIsNarrowScreen(e.matches);

	useEffect(() => {
		mediaWatcher.addEventListener('change', updateIsNarrowScreen);

		// устанавливаем видимость/невидимость подсказки при загрузке компонента
		setIsNarrowScreen(mediaWatcher.matches);

		return () => {
			mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
		}
	}, []);




	return (
		<>
			<PlaceholderText text="Введите ключевое слово">
				{
					!isNarrowScreen &&
					<>
						, например:&nbsp;&nbsp;
						<Example text={text} onClick={() => changeSpan(text)} />
					</>

				}
			</PlaceholderText>
		</>
	);
}

export default ExapmlePlaceholder;