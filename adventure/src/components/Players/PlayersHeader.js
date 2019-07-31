import React, { useEffect } from 'react';
import './Players.css';

function makePlayerIcons(players, activeToken, onClickFunc) {
	return Object.keys(players).map((token, index) =>
		(<div
			className={activeToken === token ? 
				'player-icon player-active' : 'player-icon'} 
			key={index}
			onClick={onClickFunc}
		>
			<div>{players[token].status.name.slice(0, 1)}</div>
		</div>)
	)
}

const PlayersHeader = props => {
	const init = props.initPlayers;
	useEffect(() => {
		init();
	}, [init])

	return (
		<header>
			<h2>SQUAD</h2>
			<div className="icons-container">
				{props.status.header === 'display' &&
					makePlayerIcons(props.players, props.activeToken, props.setActivePlayer)
				}
				{props.status.header === 'empty' &&
					<div
						style={{'alignSelf': 'center', 'padding': '0.25rem 0 0 1rem'}}
					>
						No Active Players!
					</div>
				}
				{props.status.header === 'form' &&
					<form
						onSubmit={event => {
							event.preventDefault();
							console.log(event.target['0'].value);
							props.addPlayer(event.target['0'].value);
						}}
						style={{'paddingLeft': '1rem'}}
					>
						<label>
						{props.status.addingPlayer ? 'Loading...' : 'Enter Auth Token:'}
						<br></br>
							<input name='token' required type='text' />
						</label>
						<input type='submit' value='Submit' />
						<br></br>
						{props.error && 
							<div style={{'color': 'red', 'font-size': '0.9rem'}} >
								{props.error}
							</div>}
					</form>
				}
				{props.status.header === 'loading' &&
					<div
						style={{'alignSelf': 'center', 'padding': '0.25rem 0 0 1rem'}}
					>
						Loading Players...
					</div>
				}
				{props.status.header === 'problem' &&
					<div
						style={{'alignSelf': 'center', 'padding': '0.25rem 0 0 1rem'}}
					>
						Problem Loading Players.
					</div>
				}

				<div
					className="add-player"
					onClick={() => props.toggleAddPlayerForm(
						props.status.header, props.status.previousHeader
					)}
				>{props.status.header === 'form' ? '<' : '+'}</div>
			</div>
		</header>
	)
}

export default PlayersHeader