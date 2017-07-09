import React from 'react';

import AjouterRecette from './AjouterRecette';

class Admin extends React.Component {
	render() {
		return (
			<div className="cards">
				<AjouterRecette addRecipe={this.props.addRecipe} />
				<footer>
					<button onClick={(e) => this.props.loadSamples()} >
						Remplir
					</button>
				</footer>
			</div>
		);
	}

	static propTypes = {
		loadSamples: React.PropTypes.func.isRequired,
		addRecipe: React.PropTypes.func.isRequired
	}
}

export default Admin;