import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { addRoom } from './MapActions';
import Room from './Room';
import './RoomsMap.css';

const RoomsMap = props => {
	// const [gridData, setGridData] = useState();
	const [grid, setGrid] = useState({
		height: 7,
		initialized: false,
		width: 7,
		xOrigin: 0,
		yOrigin: 0,
	})
	/** 
	  * origin should always be one less than grid column 1, row 1
	  * meaning the origin won't actually be on the grid
	  ***/
	// const [origin, setOrigin] = useState()

	// const [roomsArray, setRoomsArray] = useState([])

	// useEffect(() => {
	// 	if (!props.rooms) return

	// 	setRoomsArray(Object.entries(props.rooms))
	// }, [props.rooms])

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
				column={roomData.coordinates.x - grid.xOrigin}
				exits={roomData.exits}
				roomId={roomData.room_id}
				key={roomId}
				row={roomData.coordinates.y - grid.yOrigin + 1}
			/>
		)
	}

	// const testData = [
	// 	{column: 1, edges: {'e': '1'}, row: 1},
	// 	{column: 2, edges: {'s': '1', 'w': '1',}, row: 1},
	// 	{column: 2, edges: {'n': '1', 's': '?', 'w': '?', 'e': '1'}, row: 2},
	// 	{column: 2, edges: {'n': '1', 's': '?', 'w': '?', 'e': '1'}, row: 3}
	// ]
	// const testData = {
	// 	1: {column: 7, edges: {'n': '?', 's': '?', 'w': '?', 'e': '?'}, row: 7}
	// }

	// console.log('props.rooms', props.rooms)
	// console.log(grid)

	// create rooms object => pull current room to start
	// create display room function
	// init by iterating over rooms, calling display room for each

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
			{[...Array(grid.width)].map((i, index) => <p key={index}>{index + 1 + grid.xOrigin}</p>)}

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
