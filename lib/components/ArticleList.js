import React from 'react';
import Article from './Article';

//ArticleList is function component implementation
const ArticleList = (props) => {
	return (
		<div>
			{ 
				Object.values(props.articles).map(article => 
					<Article 
						key = { article.id }
						article = { article }
						author = { props.authors[article.authorId] }
					/>
				)}
		</div>
	);
};

export default ArticleList;