import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { addRoom } from './MapActions';
import Room from './Room';
import './RoomsMap.css';

const RoomsMap = props => {
	const [grid, setGrid] = useState({
		height: 7,
		initialized: false,
		width: 7,
		/** 
		  * origin should always be one less than grid column 1, row 1
		  * meaning the origin won't actually be on the grid
		  ***/
		xOrigin: 0,
		yOrigin: 0,
	})
	
	useEffect(() => {
		if (props.currentRoom) {
			let room = props.rooms[props.currentRoom]
			setGrid(prevState => ({
				...prevState,
				initialized: true,
				xOrigin: room.coordinates.x - Math.ceil(prevState.width / 2),
				yOrigin: room.coordinates.y - Math.ceil(prevState.height / 2)
			}))
		}
	}, [props.currentRoom, props.rooms])

	let rooms = []

	for (const [roomId, roomData] of Object.entries(props.rooms)) {
		if (roomData.coordinates.x < grid.xOrigin || 
			roomData.coordinates.x > grid.xOrigin + grid.width ||
			roomData.coordinates.y < grid.yOrigin ||
			roomData.coordinates.y > grid.yOrigin + grid.height) {
			continue
		}
		rooms.push(
			<Room
				className={roomData.room_id === props.currentRoom ? 'current-room' : null}
				column={roomData.coordinates.x - grid.xOrigin}
				exits={roomData.exits}
				roomId={roomData.room_id}
				key={roomId}
				row={roomData.coordinates.y - grid.yOrigin + 1}
			/>
		)
	}

	return (
		<div
			className="rooms-map"
			style={{
				'display': 'grid',
				'gridTemplateColumns': `repeat(${grid.width}, 1fr)`,
				'gridTemplateRows': `repeat(${grid.height}, 1fr)`,
				'height': '100%'
			}}
		>
			{/*[...Array(grid.width)].map((i, index) => 
				<p
					key={index}
					style={{
						'color': 'rgba(0,0,0,0.5)',
						'fontFamily': 'sans-serif',
						'fontSize': '0.75rem',
						'textAlign': 'center'
					}}
				>{index + 1 + grid.xOrigin}</p>
			)*/}

			{rooms}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		...state.map
	}
}

export default connect(
	mapStateToProps, {
		addRoom,
	}
)(RoomsMap)
