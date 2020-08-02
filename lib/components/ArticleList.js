import React from 'react';
import Article from './Article';
/*
//ArticleList is function component implementation
const ArticleList = (props) => {

	return (
		<div>
			{ 
				Object.values(props.articles).map(article => 
					<Article 
						key = { article.id }
						article = { article }
					/>
				)}
		</div>
	);
};*/

/*
Avoid fn components as they always re-render and react team also working on it 
*/
class ArticleList extends React.PureComponent{
	
	render(){
		return (
			<div>
				{ 
					Object.values(this.props.articles).map(article => 
						<Article 
							key = { article.id }
							article = { article }
						/>
					)}
			</div>
		);
	}
}


export default ArticleList;
