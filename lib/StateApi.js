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
		/*
			to simulate the issue, new article added from api, but this won't be shown in articles in PureApp component as ref. is not changed
		*/
		setTimeout(()=>{ 
			const fakeArticle = {
				...rawData.articles[0],
				id : 'fakeArticleId'
			}
			// this is copy operation, object[data] is different but using existing objects
			this.data = {
				...this.data,
				articles : {
					...this.data.articles,
					[fakeArticle.id] : fakeArticle
				}
			};
			// this is mutation and thr ref is same as object
			//this.data.articles[fakeArticle.id] = fakeArticle;
			this.runSubscriptions();
		},1000);
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