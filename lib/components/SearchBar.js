import React from 'react';

const SearchBar = () => {
	const handleSearch = () => {
	console.log(`${searchInput.value} from fn`);
	};
	let searchInput = {};
	
	//Extracting value of input field by ref
	// passing fn and in this, declaring searchInput and assigning it with input element by itself
	return (<input 		
		ref={ (input) => searchInput = input }
		type="search"
		placeholder = "Enter text to filter"
		onChange={handleSearch}		
	/>	);		
	
};

export default SearchBar;
