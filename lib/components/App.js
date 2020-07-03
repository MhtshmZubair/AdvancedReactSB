import React from 'react';
import axios from 'axios';
import DataApi from '../DataApi';
//import { data } from '../testData';

import ArticleList from './ArticleList';


class App extends React.Component {
	state = {
		articles : this.props.initialData.articles,
		authors : this.props.initialData.authors
	};
	
	
	async componentDidMount(){
		const response = await axios.get('/data');		
		const api = new DataApi(response.data);

/*		this.setState({
			articles : api.getArticles(),
			authors : api.getAuthors()			
		});
		*/
		this.setState(() => ({
			articles : api.getArticles(),
			authors : api.getAuthors(),	
		}));
	}
	
	articleActions = {
		lookupAuthor: authorId => this.state.authors[authorId],		
	}
	
	render() {
		debugger;
		return (
			<ArticleList 
				articles = { this.state.articles} 
				articleActions = { this.articleActions} 
			/>
		);	
	}
}

export default App;
