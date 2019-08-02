import React from 'react';
import './RoomsMap.css';

const radius = 16
const stroke = "rgba(0,0,0,0.35)"
const strokeDasharray = "5,5"
const strokeWidth = radius / 4
const strokeOffset = strokeWidth / 2

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

const Room = props => {
	return (
		<svg
			className={props.className}
			style={{ 'gridArea': ` -${props.row} / ${props.column} / -${props.row} / ${props.column}` }}
			viewBox="-50 -50 100 100"
		>
			<circle 
				cx="0" cy="0" r={radius}
				fill="rgba(0,0,0,0.5)"
				stroke={stroke} strokeWidth={strokeWidth}
			/>

			{Object.entries(props.exits).map(([direction, value], index) => (
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
