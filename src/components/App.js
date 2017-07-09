import React from 'react';

// Loading Custom Components
import Header from './Header';
import Admin from './Admin';
import Card from './Card'

// Loading recipes
import recettes from '../recettes';

// Firebase
import base from '../base';

class App extends React.Component {

	state = {
		recettes: {}
	};

	componentWillMount() {
		this.ref = base.syncState(`${this.props.params.pseudo}/recettes`, {
			context: this,
			state: 'recettes'
		})
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	loadSamples = () => {
		this.setState({ recettes });
	};

	updateRecette = (key, newRecette) => {
		
	};

	addRecipe = (recette) => {
		const recettes = {...this.state.recettes};
		const timestamp = Date.now();
		recettes[`recette-${timestamp}`] = recette;
		this.setState({ recettes });
	};

	isUser = (pseudo) => {
		return pseudo === this.props.params.pseudo;
	};

	render () {

		const cards = Object
			.keys(this.state.recettes)
			.map(key => <Card key={key} details={this.state.recettes[key]} />);
		
		return (
			<div className="box">
				<Header pseudo={this.props.params.pseudo} />
				<div className="cards">
					{cards}
				</div>
				<Admin
					loadSamples={this.loadSamples}
					addRecipe={this.addRecipe}
				/>
			</div>
		);
	}

	static propTypes = {
		params: React.PropTypes.object.isRequired
	}
}

export default App;