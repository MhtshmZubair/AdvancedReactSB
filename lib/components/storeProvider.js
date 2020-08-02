import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = () => ({})) => (Component) => {
/*	const WithStore = (props, { store }) =>
		<Component {...props} store={store} />;	
	 	
	WithStore.contextTypes = {
		store: PropTypes.object
	};
	
	WithStore.displayName = `${Component.name}Container`;
	return WithStore;
	
	Higher Order component usually use class Component not fn. component implementation as 
	- manage state
	- need component lifecycle
	
*/
	return class extends React.PureComponent{
		static displayName = `${Component.name}Container`;
		static contextTypes = {
			store: PropTypes.object
		};
		
		// so sometimes in extraProps we used state & sometimes not	
		usedState = () => {
			// making higherOrderComponent only dependent on interested state
			return extraProps(this.context.store, this.props);
		}	
		
		state = this.usedState();
		// these changes for 
		// - extending PureComponent 	
		// - using lifecycles methods to rerender when store update by calling forceUpdate 
		// - accessing global state remove the need to pass store from App
		// - glabal state i.e.contextapi is giving option to access the store for the child component via this storeProvider fn
		onStoreChange = () => {
			/* though our containercomponent is updating but it is not the best option performance wise
			 this has issue for unmounted components as order of things are wired in our react app
			 order of subscribing, unsubscribing			
			 currently we are setting subscriptionId to null in unmounted
			 this the place we realize that third party libraries help us but we lost the learning 
			*/
			if(this.subscriptionId){
				//this.forceUpdate();				
				this.setState(this.usedState());
			}
		}
		
		componentDidMount(){
			this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
		}
		
		componentWillUnmount(){
			this.context.store.unsubscribe(this	.subscriptionId);			
			this.subscriptionId = null;
		}
					
		render() {
			return <Component 
					{...this.props} 
					{...this.usedState()}
					store={this.context.store} />;		 	
		}		
	};
}; 

export default storeProvider;
