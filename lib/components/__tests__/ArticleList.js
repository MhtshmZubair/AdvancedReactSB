import React from 'react';
//import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ArticleList from '../ArticleList';
import Article from '../Article';

describe('ArticleList', () => {
	const testProps = {
		articles : { 
			a : { id : 'a'},
			b : { id : 'b'}
		},		
	};
	
	Article.propTypes = {};
	
	it('render correctly', () => {
		const wrapper = shallow(
			<ArticleList
			    {...testProps}
			/>
		);
		
		console.log(wrapper.node.props.children);
		
		expect(wrapper.find('ArticleContainer').length).toBe(2);
		expect(wrapper.node.props.children.length).toBe(2);
		expect(wrapper).toMatchSnapshot();		
	});	
});