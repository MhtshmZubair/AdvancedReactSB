import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import TimeStamp from './TimeStamp';

class App extends React.PureComponent {	
	static childContextTypes = {
		store : PropTypes.object,
	};
	
	getChildContext() {
		return { // define here list of object to be globally available from context api by using the assigning values and the key is the name by which we're exposing it good if we use same key as the object
			store : this.props.store,	
		};
	}		
	
	appState = () => {
		const { articles , searchTerm } = this.props.store.getState();
		return { articles, searchTerm };
	}
	
	state = this.appState();
	
	onStoreChange = () => {
		this.setState(this.appState());
	}
	
	componentDidMount(){
		this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
		this.props.store.startClock();
	}
	
	componentWillUnmount(){
		this.props.store.unsubscribe(this.subscriptionId);
	}
	
	render() {
		let { articles, searchTerm } = this.state;
		if (searchTerm){
			const searchRE = new RegExp(searchTerm,'i');
			articles = pickBy(articles, (value) => {
				return value.title.match(searchRE) || value.body.match(searchRE);
			});
		}
		return (
			<div>				
				<TimeStamp />
				<hr />	
				<SearchBar />
				<hr />
				<ArticleList articles = { articles } />
			</div>	
		);	
	}
}

export default App;
