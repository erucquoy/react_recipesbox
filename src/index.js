// Import React
import React from 'react';
import { render } from 'react-dom';
// React Router
import { BrowserRouter, Match, Miss } from 'react-router';

// Import React Components
import Connexion from './components/Connexion';
import App from './components/App';
import NotFound from './components/NotFound';

// Import CSS
import './index.css'

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={Connexion} />
				<Match exactly pattern="/box/:pseudo" component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}

render (
	<Root />,
	document.getElementById('root')
);