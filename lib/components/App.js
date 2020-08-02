import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import Perf from 'react-addons-perf';
if(typeof window !== 'undefined'){
	window.Perf = Perf;
}
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import TimeStamp from './TimeStamp';

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
	
	onStoreChange = () => {
		this.setState(this.props.store.getState());
	}
	
	componentDidMount(){
		this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
		this.props.store.startClock();
		
		setImmediate(()=>{
			Perf.start();	
		});
		
		
		setTimeout(()=>{
			Perf.stop();
			Perf.printWasted();	
		}, 5000);
	}
	
	componentWillUnmount(){
		this.props.store.unsubscribe(this.subscriptionId);
	}
	
	render() {
		let { articles, searchTerm, timestamp } = this.state;
		if (searchTerm){
			const searchRE = new RegExp(searchTerm,'i');
			articles = pickBy(articles, (value) => {
				return value.title.match(searchRE) || value.body.match(searchRE);
			});
		}
		return (
			<div>				
				<div>React version is: {React.version}</div>				
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
