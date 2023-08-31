import React, { useEffect, useRef, useState } from 'react';
import { Example, PlaceholderText } from './styled';





const ExapmlePlaceholder = ({ text = "Супы", changeSpan }) => {
	const [isNarrowScreen, setIsNarrowScreen] = useState(matchMedia('max-width: 519.99px').matches);

	const mediaWatcher = window.matchMedia("(max-width: 519.99px)");
	const updateIsNarrowScreen = (e) => setIsNarrowScreen(e.matches);

	useEffect(() => {
		mediaWatcher.addEventListener('change', updateIsNarrowScreen);

		return () => {
			mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
		}
	}, [])



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