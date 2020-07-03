import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import config from 'config';
import DataApi from 'DataApi';
import App from 'components/App';

const serverRender = async () => {
	
		const dataURL = `http://${config.host}:${config.port}/data`;
		const response = await axios.get(dataURL);		
		const api = new DataApi(response.data);
		
		const initialData = {
			articles : api.getArticles(),
			authors : api.getAuthors()			
		};
	
	return {
			initialMarkup : ReactDOMServer.renderToString(
		<App initialData = {initialData} />
	), initialData 
	};		
};

export default serverRender;
