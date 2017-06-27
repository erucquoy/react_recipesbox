import React from 'react';

class Admin extends React.Component {
	render() {
		return (
			<div className="cards">
				<footer>
					<button onClick={(e) => this.props.loadSamples()} >
						Remplir
					</button>
				</footer>
			</div>
		);
	}

	static propTypes = {
		loadSamples: React.PropTypes.func.isRequired
	}
}

export default Admin;