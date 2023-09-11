import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import InitStyle from 'init/mainStyle';
import App from 'App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';


ReactDOM.createRoot(document.getElementById('root'))

	.render(
		<>

			{/* <StrictMode> */}
			< InitStyle />

			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
			{/* </StrictMode > */}
		</>
	);