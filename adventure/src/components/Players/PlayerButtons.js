import React from 'react';
import './Players.css';

const PlayerButtons = props => {
	let exits = (props.players[props.activeToken] && 
		props.players[props.activeToken].room.exits) ||
		{}

	// console.log('exits', exits)

	return (
		<div className="player-buttons">
			{['n', 's', 'w', 'e'].map(i => (
				<button
					className="move-button"
					disabled={!exits.hasOwnProperty(i)}
					key={i}
					onClick={event => {
						event.preventDefault()
						props.movePlayer(
							i,
							props.players[props.activeToken].room,
							props.activeToken
						)
					}}
				>{i}</button>
			))}
			
			
		</div>
	)
}

// <button disabled={!exits.hasOwnProperty('s')}>S</button>
// <button disabled={!exits.hasOwnProperty('e')}>E</button>
// <button disabled={!exits.hasOwnProperty('w')}>W</button>

export default PlayerButtons
