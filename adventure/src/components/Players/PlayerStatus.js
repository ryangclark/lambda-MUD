import React from 'react';
import './Players.css';

const PlayerStatus = props => {
	let playerStatus = props.activeToken && props.players[props.activeToken]
						? props.players[props.activeToken].status 
						: null;

	return (
		<div className="player-status-container">
			<h2>{playerStatus && playerStatus.name}</h2>
				<p className="stat-label">Gold:</p>
				<p className="stat-data">{playerStatus && playerStatus.gold}</p>

				<p className="stat-label">Encumbrance:</p>
				<p className="stat-data">{playerStatus && playerStatus.encumbrance}</p>
			
			
				<p className="stat-label">Strength:</p>
				<p className="stat-data">{playerStatus && playerStatus.strength}</p>
			
				<p className="stat-label">Speed:</p>
				<p className="stat-data">{playerStatus && playerStatus.speed}</p>

				<p className="stat-label inventory">Inventory:</p>
				{(playerStatus && playerStatus.inventory.length)  
					? playerStatus.inventory.map((item, index) => 
						<p className="stat-data inventory" key={`${item}-${index}`}>{item}</p>)
					: <p className="stat-data inventory">None</p>
				}

				<p className="stat-label left">Status:</p>
				{(playerStatus && playerStatus.status.length)
					? playerStatus.status.map((status, index) => 
						<p className="stat-data entry" key={`${status}-${index}`}>{status}</p>)
					: <p className="stat-data entry">None</p>
				}
		</div>
	)
}

export default PlayerStatus