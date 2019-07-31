import React from 'react';
import { connect } from 'react-redux';

import RoomsMap from './RoomsMap';

const MapContainer = props => {
	return (
		<section className="map-container">
			<RoomsMap {...props} />
		</section>
	)
}

const mapStateToProps = state => {
	return {
		...state.roomsMap
	}
}

export default connect(
	mapStateToProps, {
		// ACTIONS
	}
)(MapContainer)