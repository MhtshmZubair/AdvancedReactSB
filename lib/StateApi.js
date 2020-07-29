class StateApi {
	
	constructor(rawData, dateString){
		this.data = {
			articles : this.mapIntoObjects(rawData.articles),
			authors : this.mapIntoObjects(rawData.authors),
			searchTerm : '',
			timestamp : dateString,
		};
		this.subscriptions = [] ;
		this.lastSubscriptionId = 0 ;
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
	
	subscribe = (cb) => {
		this.lastSubscriptionId++;
		this.subscriptions[this.lastSubscriptionId] = cb;
		return this.lastSubscriptionId;
	};
		
	unsubscribe = (subscriptionId) => {
		delete this.subscriptions[subscriptionId];
	};
	
	runSubscriptions = () => {
		Object.values(this.subscriptions).forEach(cb => cb());
	};

// this merge object by comparing properties	
	mergeData = changeState => {
		this.data = {
			...this.data,
			...changeState
		};
		this.runSubscriptions();	
	};
	
	setSearchTerm = (searchTerm) => {
		this.mergeData({searchTerm,});		
	};
	
	startClock = () => {		
		setInterval(() => {
			this.mergeData({
				timestamp: new Date(),
			});	
		},1000);
	};	
}

export default StateApi;