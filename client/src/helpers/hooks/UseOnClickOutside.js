import { useEffect } from 'react';


const UseOnClickOutside = (ref, handler) => {
	useEffect(() => {
		const listener = e => {
			if (!ref.current || ref.current.contains(e.target)) return;
			handler(e);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);
		}

	}, [ref, handler]);

}

export default UseOnClickOutside;