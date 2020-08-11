import renderer from 'react-test-renderer';
import React from 'react';
import Film from './film';
//import { BrowserRouter as Router } from 'react-router-dom';

describe('Film snapshot', () => {
	const filmTree = renderer.create(<Film />);
	it('Should match', () => {
		expect(filmTree.toJSON()).toMatchSnapshot();
	});
});
