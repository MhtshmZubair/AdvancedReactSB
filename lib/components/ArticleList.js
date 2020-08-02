import React from 'react';
import Article from './Article';

/*
Avoid fn components as they always re-render and react team also working on it 
*/
class ArticleList extends React.Component{
	
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
