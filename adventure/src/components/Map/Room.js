import React from 'react';
import './RoomsMap.css';

// {'n': '?', 's': '?', 'w': '?', 'e': '?'}

const radius = 16
const stroke = "green"
const strokeDasharray = "5,5"
const strokeWidth = radius / 4
const strokeOffset = strokeWidth / 2

// const n = (
// 	<line
// 		x1={strokeOffset} y1={radius} x2={strokeOffset} y2="50"
// 		stroke={stroke}
// 		stroke-dasharray={strokeDasharray}
// 		stroke-width={strokeWidth} 
// 	/>
// )

const lookUp = {
	e: {
		x1: radius,
		x2: 50,
		y1: strokeOffset,
		y2: strokeOffset,
	},
	n: {
		x1: 0,
		x2: 0,
		y1: -radius,
		y2: -50
	},
	s: {
		x1: 0,
		x2: 0,
		y1: radius,
		y2: 50
	},
	w: {
		x1: -radius,
		x2: -50,
		y1: strokeOffset,
		y2: strokeOffset,
	}
}

console.log('loopUp Test:', lookUp['n'].x1)

const Room = props => {
	return (
		<svg 
			style={{ 'gridColumn': `${props.column}`, 'gridRow': `${props.row}` }}
			viewBox="-50 -50 100 100"
		>
			<circle 
				cx="0" cy="0" r={radius}
				fill="yellow"
				stroke={stroke} strokeWidth={strokeWidth}
			/>

			{Object.entries(props.edges).map(([direction, value], index) => (
				<line
					key={`${index}-${direction}`}
					stroke={stroke}
					strokeDasharray={value === '?' ? strokeDasharray : 0}
					strokeWidth={strokeWidth}
					x1={lookUp[direction].x1}
					x2={lookUp[direction].x2}
					y1={lookUp[direction].y1}
					y2={lookUp[direction].y2}
				/>
			))}
		</svg>
	)
}

export default Room

// <line
// 	x1="16" y1="2" x2="50" y2="2"
// 	stroke="green" stroke-dasharray="5,5" stroke-width="4" 
// />