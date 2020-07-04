class StateApi {
	
	constructor(rawData){
		this.data = {
			articles : this.mapIntoObjects(rawData.articles),
			authors : this.mapIntoObjects(rawData.authors)	
		}
	}
	
	mapIntoObjects (arr) {
		return arr.reduce((acc, curr)=>{
			acc[curr.id] = curr;
			return acc;
		}, {});
	}

    lookupAuthor = (authorId) => {
		return this.data.authors[authorId];
    };

// 	getState()  this is fn while getState = () => is class property 
// no binding is required for class property	
	getState = () => {
		return this.data;
	};
}

export default StateApi;