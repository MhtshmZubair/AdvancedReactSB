import React from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickby';

class App extends React.Component {	
	static childContextTypes = {
		store : PropTypes.object,
	};
	
	getChildContext() {
		return { // define here list of object to be globally available from context api by using the assigning values and the key is the name by which we're exposing it good if we use same key as the object
			store : this.props.store,	
		};
	}	
		
	state = this.props.store.getState();
	
	//builtin setState is good for small state and currently it is being managed in App component but it should be moved to store 
	setSearchTerm = (searchTerm) => {
		this.setState({searchTerm});
	};
	
	render() {
		let { articles, searchTerm } = this.state;
		if (searchTerm){
			articles = pickBy(articles, (value) => {
				return value.title.match(searchTerm) || value.body.match(searchTerm);
			});
		}
		return (
			<div>
				<SearchBar  doSearch={this.setSearchTerm} />
				<ArticleList 
					articles = { articles } 
				/>
			</div>	
		);	
	}
}

export default App;
