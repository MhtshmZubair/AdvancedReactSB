import React from 'react';

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

export default TimeStamp; 