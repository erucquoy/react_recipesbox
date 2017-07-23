import React from 'react';

import base from '../base';
import AjouterRecette from './AjouterRecette';

class Admin extends React.Component {

	state = {
		uid: null,
		owner: null
	};

	componentDidMount() {
		base.onAuth(user => {
			if (user) {
				this.doConnexion(null, {user});
			}
		})
	}

	connexion = provider => {
		base.authWithOAuthPopup(provider, this.doConnexion);
	};

	deconnexion = () => {
		base.unauth();
		this.setState({ uid: null });
	}

	doConnexion = (err, authData) => {
		if (err) {
			console.log(err);
			return;
		}
		// Récuperer le nom de la box
		const boxRef = base.database().ref(this.props.pseudo);
		boxRef.once('value', snapshot => {
			const data = snapshot.val() || {};

			// Attribuer la box si elle n'appartient à personne
			if (!data.owner) {
				boxRef.set({
					owner: authData.user.uid
				})
			}

			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			})
		})
	};

	traiterChangement = (event, key) => {
		const recette = this.props.recettes[key];
		const newRecette = {
			...recette,
			[event.target.name]: event.target.value
		};
		this.props.updateRecipe(key, newRecette);
	};

	renderLogin = () => {
		return (
			<div className="login">
				<h2>Connecte toi pour créer tes recettes !</h2>
				<button className="facebook-button" onClick={() => this.connexion('facebook')} >Me connecter avec Facebook</button>
				<button className="twitter-button" onClick={() => this.connexion('twitter')} >Me connecter avec Twitter</button>
			</div>
		);
	};

	renderAdmin = key => {
		const recette = this.props.recettes[key];
		return (
			<div className="card" key={key} >
				<form className="admin-form">
					<input type="text" name="nom" placeholder="Nom de la recette" value={recette.nom} onChange={(e) => this.traiterChangement(e, key)} />
					<input type="text" name="image" placeholder="Adresse de l'image" value={recette.image} onChange={(e) => this.traiterChangement(e, key)} />
					<textarea name="ingredients" rows="3" placeholder="Liste des ingrédients" value={recette.ingredients} onChange={(e) => this.traiterChangement(e, key)} ></textarea>
					<textarea name="instructions" rows="15" placeholder="Liste des instructions" value={recette.instructions} onChange={(e) => this.traiterChangement(e, key)} ></textarea>
				</form>
				<button onClick={() => this.props.deleteRecipe(key)}>Supprimer</button>
			</div>
		);
	};

	render() {

		if (!this.state.uid) {
			return <div>{this.renderLogin()}</div>
		}
		
		if (this.state.uid !== this.state.owner) {
			return (
				<div className="login">
					{this.renderLogin()}
					<p>Tu n'es pas le propriétaire de cette boîte à recettes.</p>
				</div>
			)
		}
		

		const adminCards = Object
			.keys(this.props.recettes)
			.map(this.renderAdmin);

		return (
			<div className="cards">
				<AjouterRecette addRecipe={this.props.addRecipe} />
				{adminCards}
				<footer>
					<button onClick={(e) => this.props.loadSamples()} >
						Remplir
					</button>
					<button onClick={(e) => this.deconnexion()}>
						Deconnexion
					</button>
				</footer>
			</div>
		);
	}

	static propTypes = {
		loadSamples: React.PropTypes.func.isRequired,
		addRecipe: React.PropTypes.func.isRequired,
		updateRecipe: React.PropTypes.func.isRequired,
		deleteRecipe: React.PropTypes.func.isRequired,
		recettes: React.PropTypes.object.isRequired,
		pseudo: React.PropTypes.string.isRequired
	}
}

export default Admin;