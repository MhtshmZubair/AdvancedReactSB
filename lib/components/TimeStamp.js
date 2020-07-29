import React from 'react';
import storeProvider from './storeProvider';

class TimeStamp extends React.Component {

	render(){
		
		const dateString = `Time on Server : ${this.props.timestamp.toString()}`;
	
		return (
			<div>
				{dateString}
			</div>
		);	
	}
}

function extraProps(store){
	return {
		timestamp : store.getState().timestamp
	};
}

export default storeProvider(extraProps)(TimeStamp); 