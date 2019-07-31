import React from 'react';
import { connect } from 'react-redux';

import PlayersHeader from './PlayersHeader';
import PlayerRoom from './PlayerRoom';
import PlayerStatus from './PlayerStatus';
import './Players.css';

import { 
	addPlayer,
	initPlayers,
	toggleAddPlayerForm,
	setActivePlayer
} from './PlayersActions';

const PlayersContainer = props => {
	return (
		<section className="players-container">
			<PlayersHeader {...props} />
			<PlayerStatus {...props} />
			<PlayerRoom {...props} />
		</section>
	)
}

const mapStateToProps = state => {
	return {
		...state.players
	}
}

export default connect(
	mapStateToProps, {
		addPlayer,
		initPlayers,
		toggleAddPlayerForm,
		setActivePlayer
	}
)(PlayersContainer)
