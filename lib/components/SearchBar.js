import React from 'react';

class SearchBar extends React.Component {
	handleSearch = () => {
		console.log(this.searchInput.value);
	}
	//Extracting value of input field by ref
	// passing fn and in this, declaring searchInput and assigning it with input element by itself
	
	render(){
		return (<input 		
			ref={ (input) => this.searchInput = input }
			type="search"
			placeholder = "Enter text to filter"
			onChange={this.handleSearch}		
		/>	);		
			
	}
}

export default SearchBar;
