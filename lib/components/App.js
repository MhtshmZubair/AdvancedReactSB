import React from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';

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
	
	render() {
		return (
			<div>
				<SearchBar />
				<ArticleList 
					articles = { this.state.articles } 
				/>
			</div>	
		);	
	}
}

export default App;
