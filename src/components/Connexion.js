import React from 'react';

class Connexion extends React.Component {

	goToApp = (e) => {
		e.preventDefault();
		const pseudo = this.boxInput.value;
		this.context.router.transitionTo(`/box/${pseudo}`);
	};

	render() {
		return (
			<div className="connexionBox" onSubmit={(e) => this.goToApp(e)}>
				<form className="connexion">
					<h1>Ma Boîte à Recettes</h1>
					<input
						type="text" placeholder="Nom du chef" required
						pattern="[A-Za-z-]{1,}"
						ref={(input) => {this.boxInput = input}}
					/>
					<button type="submit">Ouvrir ma box</button>
				</form>
			</div>
		);
	}

	static contextTypes = {
		router: React.PropTypes.object
	}
}

export default Connexion;