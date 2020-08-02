import React from 'react';
import PropTypes from 'prop-types';
import storeProvider from './storeProvider';

// global styles won't create new style object each time article render/rerender
const styles = {
	article : {
		paddingBottom : 10,
		borderBottomStyle : 'solid',
		borderBottomColor : '#aaa',
		borderBottomWidth : 1,
		marginBottom : 10,
	},
	title : {
		fontWeight : 'bold'
	},
	date : {
		fontSize : '0.85em',
		color : '#888'
	},
	author : {
		paddingLeft : 10,
		paddingBottom : 10
	},
	body : {
		paddingLeft : 20
	}
};

//global it should not be created eachtime article render/rerender
const dateDisplay = (dateString) => new Date(dateString).toDateString();

// {} these are used to access inner property of context object
class Article extends React.PureComponent {
	
	render(){
		const { article, author } = this.props;
		return (
			<div style={styles.article}>	
				<div style={styles.title}>{article.title}</div>
				<div style={styles.date}>{dateDisplay(article.date)}</div>	
				<div style={styles.author}>
					<a href={author.website}>
						{author.firstName} {author.lastName}
					</a>
				</div>			
				<div style={styles.body}>{article.body}</div>		
			</div>
		);	
	}	
}


Article.propTypes = {
       article: PropTypes.shape({
               title: PropTypes.string.isRequired,
               date: PropTypes.string.isRequired,
               body: PropTypes.string.isRequired
       })
};

// storeProvider have access to both store & props it should call this fn on store object which it is accessing from contextapi and this logic is dedicated to our presentational component while generic storeProvider is only calling lamda fn which it is feeded as first fn (fn1)
function extraProps(store, originalProps){
	return { 
		author: store.lookupAuthor(originalProps.article.authorId)
	};
}

//storeProvider will invoke this extraProps using  to extract info and passed it as props to wrapped component, 
//now storeProvider fn will return another fn
// extraProps will be argument to fn1
// and wrapped component will be argument to fn2
//lamda fn has simple way to passed this by 
export default storeProvider(extraProps
)(Article);
