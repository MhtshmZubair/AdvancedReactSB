import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import config from 'config';
import StateApi from 'StateApi';
import App from 'components/App';

const serverRender = async () => {
	
	const dataURL = `http://${config.host}:${config.port}/data`;
	const response = await axios.get(dataURL);		
	const store = new StateApi(response.data);		
	
	return {
			initialMarkup : ReactDOMServer.renderToString(
		<App store = {store} />
	), initialData : response.data 
	};		
};

export default serverRender;
