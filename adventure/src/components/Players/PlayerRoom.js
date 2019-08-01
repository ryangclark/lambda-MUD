import React from 'react';
import './Players.css';

const PlayerRoom = props => {
	let playerRoom = props.activeToken 
						? props.players[props.activeToken].room 
						: null;
	return (
		<div className="player-status-container">
			<h2>{playerRoom && `Room ${playerRoom.room_id}: ${playerRoom.title}`}</h2>
			<table>
				<tbody>
					<tr>
						<th>Coordinates:</th>
						<td>{playerRoom && playerRoom.coordinates}</td>
					</tr>
					<tr>
						<th>Elevation:</th>
						<td>{playerRoom && playerRoom.elevation}</td>
					</tr>
					{/* <tr>
						<th>Exits:</th>
						<td>{playerRoom && playerRoom.exits}</td>
					</tr> */}
					<tr>
						<th>Description:</th>
						<td>{playerRoom && playerRoom.description}</td>
					</tr>
					<tr>
						<th>Terrain:</th>
						<td>{playerRoom && playerRoom.terrain}</td>
					</tr>
					<tr>
						<th>Players Here:</th>
						<td>{playerRoom && playerRoom.players.length}</td>
					</tr>
					<tr>
						<th>Items:</th>
						<td>{playerRoom && playerRoom.items.length}</td>
					</tr>
					<tr>
						<th>Errors:</th>
						<td>{playerRoom && playerRoom.errors[0]}</td>
					</tr>
					<tr>
						<th>Messages:</th>
						<td>{playerRoom && playerRoom.messages[0]}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default PlayerRoom;