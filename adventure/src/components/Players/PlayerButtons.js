import React, { useEffect, useState } from 'react';
import './Players.css';

const PlayerButtons = props => {
	let exits = (props.players[props.activeToken] && 
		props.players[props.activeToken].room.exits) ||
		{}

	// console.log('props', props.cooldown)

	const [cooldownTimer, setCooldownTimer] = useState()
	// const [intervalId, setIntervalId] = useState()

	useEffect(() => {
		setCooldownTimer(props.cooldown)
	}, [props.cooldown])

	// useEffect(() => {
	// 	if (props.cooldown && !intervalId) {
	// 		console.log(cooldownTimer)
			
	// 		// setIntervalId(setInterval(cooldownInterval, 1000))

	// 		// setIntervalId(interval)

	// 		function cooldownInterval() {
	// 			console.log('cooldownTimer', cooldownTimer)
	// 			if (cooldownTimer < 1) {
	// 				setCooldownTimer(0)
	// 				clearInterval(intervalId)
	// 				setIntervalId(null)
	// 				return
	// 			}
	// 			setCooldownTimer(prevState => prevState - 1)
	// 		}

	// 		let interval = setInterval(cooldownInterval, 1000)

	// 		setIntervalId(interval)
	// 	}
	// 	return () => {
	// 		clearInterval(intervalId)
	// 		setIntervalId(null)
	// 	}
	// }, [cooldownTimer, props.cooldown])

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
			
			<p className="cooldown">{cooldownTimer}</p>
		</div>
	)
}

// <button disabled={!exits.hasOwnProperty('s')}>S</button>
// <button disabled={!exits.hasOwnProperty('e')}>E</button>
// <button disabled={!exits.hasOwnProperty('w')}>W</button>

export default PlayerButtons
