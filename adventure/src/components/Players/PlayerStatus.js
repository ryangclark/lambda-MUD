import React from 'react';
import './Players.css';

const PlayerStatus = props => {
	let playerStatus = props.activeToken 
						? props.players[props.activeToken].status 
						: null;

	return (
		<div className="player-status-container">
			<h2>{playerStatus && playerStatus.name}</h2>
			<table>
				<tbody>
					<tr>
						<th>Gold:</th>
						<td>{playerStatus && playerStatus.gold}</td>
					</tr>
					<tr>
						<th>Encumbrance:</th>
						<td>{playerStatus && playerStatus.encumbrance}</td>
					</tr>
					<tr>
						<th>Strength:</th>
						<td>{playerStatus && playerStatus.strength}</td>
					</tr>
					<tr>
						<th>Speed:</th>
						<td>{playerStatus && playerStatus.speed}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default PlayerStatus