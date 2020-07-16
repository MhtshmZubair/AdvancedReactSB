import React from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';

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
			<ArticleList 
				articles = { this.state.articles } 
			/>
		);	
	}
}

export default App;
