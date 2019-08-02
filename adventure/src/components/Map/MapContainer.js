import React from 'react';
import { connect } from 'react-redux';

import RoomsMap from './RoomsMap';

const MapContainer = props => {
	return (
		<section className="map-container">
			{props.currentRoom ? <RoomsMap {...props} /> : null}
		</section>
	)
}

const mapStateToProps = state => {
	return {
		...state.map
	}
}

export default connect(
	mapStateToProps, {
		// ACTIONS
	}
)(MapContainer)