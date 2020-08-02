import React from 'react';
import storeProvider from './storeProvider';

// PureComponent helps us checking nextProps, nextState on update process tp avoid re-rendering
class TimeStamp extends React.PureComponent {
	
	static displayTimeStamp = (timestamp) => timestamp.toLocaleString([], { hour : '2-digit', minute : '2-digit'});
	
	// need to use custom logic to cancel re-rendering 
	/*
	shouldComponentUpdate(nextProps){
		const currentTime = this.displayTimeStamp(this.props.timestamp);
		const nextTime = this.displayTimeStamp(nextProps.timestamp);
		return currentTime !== nextTime;
	}
	*/
	// should cast hour & minute
	render(){		
		return (
			<div>
				{this.props.showTimestamp}
			</div>
		);	
	}
}

function extraProps(store){
	return {
		showTimestamp : TimeStamp.displayTimeStamp(store.getState().timestamp)
	};
}

export default storeProvider(extraProps)(TimeStamp); 