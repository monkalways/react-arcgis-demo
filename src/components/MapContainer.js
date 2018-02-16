import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebMap } from 'react-arcgis';

import { loadMap } from '../actions/mapActions';

class MapContainer extends Component {
    
    handleMapLoad = (map, view) => {
        

        this.props.loadMap(map, view);
    }

    render() {
        return (
            <WebMap id="d1e4c1b77bab4e06b5a94a16f6079a70" onLoad={this.handleMapLoad} />
        );
    }
}

export default connect(null, {loadMap})(MapContainer);