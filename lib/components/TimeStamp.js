import React from 'react';
import storeProvider from './storeProvider';

class TimeStamp extends React.PureComponent {
	
	// though global state is being changed but PureComponent knows that it does not need to show the second part hence re-rending is not occuring
	componentWillUpdate(nextProps, nextState){
		console.log(`updating timestamp`);
	}

	render(){
		
		const dateString = `Time on Server : ${this.props.timestamp}`;
	
		return (
			<div>
				{dateString}
			</div>
		);	
	}
}

function extraProps(store){
	return {
		timestamp : store.getState().timestamp.toLocaleString([], { hour : '2-digit', minute : '2-digit'})
	};
}

export default storeProvider(extraProps)(TimeStamp); 