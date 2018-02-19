import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WebMap } from 'react-arcgis';

import { loadMap } from '../actions/mapActions';
import { initializeArcGisMap } from '../services/arcgisService';

class MapContainer extends Component {
    
    handleMapLoad = (map, view) => {
        
        // The following line passes map and view to the service directly, bypassing action and reducer.
        // this is done to avoid passing map and view as action parameters. The ArcGIS "WebMap" class
        // does not support toJSON, which can cause redux development tool to crash.
        initializeArcGisMap(map, view);
        this.props.loadMap();
    }

    render() {
        return (
            <WebMap id="d1e4c1b77bab4e06b5a94a16f6079a70" onLoad={this.handleMapLoad} />
        );
    }
}

export default connect(null, {loadMap})(MapContainer);