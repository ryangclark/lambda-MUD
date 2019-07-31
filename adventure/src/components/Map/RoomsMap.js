import React, { useState } from 'react';
import Room from './Room';
import './RoomsMap.css';

const RoomsMap = props => {
	// const [gridData, setGridData] = useState();
	const [gridSize, setGridSize] = useState({height: 10, width: 10})

	const testData = [
		{column: 1, edges: {'e': '1'}, row: 1},
		{column: 2, edges: {'s': '1', 'w': '1',}, row: 1},
		{column: 2, edges: {'n': '1', 's': '?', 'w': '?', 'e': '1'}, row: 2},
		{column: 2, edges: {'n': '1', 's': '?', 'w': '?', 'e': '1'}, row: 3}
	]

	return (
		<React.Fragment>
			<svg width="100%" height="100%">
				Sorry, your browser does not support inline SVG.
			</svg>
			<div
				className="rooms-map"
				style={{
					'display': 'grid',
					'gridTemplateColumns': `repeat(${gridSize.width}, 1fr)`,
					'gridTemplateRows': `repeat(${gridSize.height}, 1fr)`,
					'height': '100%'
				}}
			>
				{testData.map((item, index) => 
					<Room
						column={item.column}
						edges={item.edges}
						key={item.index}
						row={item.row}
					/>
				)}
			</div>
		</React.Fragment>
	)
}
// width="50" height="50"
// cx="50" cy="50"
export default RoomsMap