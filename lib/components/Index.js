import React from 'react';
import ReactDOM  from 'react-dom';

//class component earlier function component syntax
class App extends React.Component {
	//class property
	state = {
		name : 'Mohtshm'
	};
	asynFunc = () => {
		return Promise.resolve('Ummati');
	};
	
	async componentDidMount() {
		this.setState({
			name : await this.asynFunc()
		});		
	}
	render() {
		return (
			<h2>asSalam o alaikm -- { this.state.name } </h2>
		);
	}
}

export default App;

ReactDOM.render(
<App />, 
document.getElementById('root')
);

