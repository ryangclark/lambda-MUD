import React from 'react';
import './Players.css';

const PlayerRoom = props => {
	let playerRoom = props.activeToken 
						? props.players[props.activeToken].room 
						: null;
	return (
		<div className="player-room-container">
			<h2>{playerRoom && `Room ${playerRoom.room_id}: ${playerRoom.title}`}</h2>

			<p className="stat-label">Terrain:</p>
			<p className="stat-data">{playerRoom && playerRoom.terrain}</p>

			<p className="stat-label">Coordinates:</p>
			<p className="stat-data">{playerRoom && playerRoom.coordinates}</p>

			<p className="stat-label">Elevation:</p>
			<p className="stat-data">{playerRoom && playerRoom.elevation}</p>

			<p className="stat-label">Players Here:</p>
			<p className="stat-data">{playerRoom && playerRoom.players.length}</p>

			<p className="stat-label big">Description:</p>
			<p
				className="stat-data big"
				style={{'maxWidth': '95%'}}
			>{playerRoom && playerRoom.description}</p>

			<p className="stat-label left">Items:</p>
			{(playerRoom && playerRoom.items.length)  
				? playerRoom.items.map(item => 
					<p className="stat-data entry" key={item}>{item}</p>)
				: <p className="stat-data entry">None</p>
			}

			<p className="stat-label left">Messages:</p>
			{(playerRoom && playerRoom.messages.length)  
				? playerRoom.messages.map(message => 
					<p className="stat-data entry" key={message}>{message}</p>)
				: <p className="stat-data entry">None</p>
			}

			<p className="stat-label left">Errors:</p>
			{(playerRoom && playerRoom.errors.length)  
				? playerRoom.errors.map(error => 
					<p className="stat-data entry" key={error}>{error}</p>)
				: <p className="stat-data entry">None</p>
			}
		</div>
	)
}

export default PlayerRoom;