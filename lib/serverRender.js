import React from 'react';
import App from './components/App';
import ReactDOMServer from 'react-dom/server';

const serverRender = () => {
	return ReactDOMServer.renderToString(
		<App />
		);		
}

export default serverRender;
