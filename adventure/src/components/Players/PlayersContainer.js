import React from 'react';
import { connect } from 'react-redux';

import PlayerButtons from './PlayerButtons';
import PlayersHeader from './PlayersHeader';
import PlayerRoom from './PlayerRoom';
import PlayerStatus from './PlayerStatus';
import './Players.css';

import { 
	addPlayer,
	initPlayers,
	movePlayer,
	toggleAddPlayerForm,
	setActivePlayer
} from './PlayersActions';

const PlayersContainer = props => {
	return (
		<section className="players-container">
			<PlayersHeader {...props} />
			<PlayerButtons {...props} />
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
		movePlayer,
		toggleAddPlayerForm,
		setActivePlayer
	}
)(PlayersContainer)
