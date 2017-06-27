import React from 'react';

// Loading Custom Components
import Header from './Header';
import Admin from './Admin';

// Loading recipes
import recettes from '../recettes';

class App extends React.Component {

	state = {
		recettes: {}
	};

	loadSamples = () => {
		this.setState({ recettes });
	};

	isUser = (pseudo) => {
		return pseudo === this.props.params.pseudo;
	};

	render () {
		return (
			<div className="box">
				<Header pseudo={this.props.params.pseudo} />
				<div className="cards">
					<div className="card"></div>
				</div>
				<Admin loadSamples={this.loadSamples} />
			</div>
		);
	}

	static propTypes = {
		params: React.PropTypes.object.isRequired
	}
}

export default App;