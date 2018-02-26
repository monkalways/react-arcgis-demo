import { 
    MAP_LOAD, 
    LAYER_VISIBILITY_CHANGE, 
    LEGEND_TOGGLE, 
    CAMERA_LAYER_FILTER, 
    MAP_LAYER_QUERY,
    MAP_LAYER_QUERY_COMPLETE,
    SEARCH_RESULTS_HIDE,
    FEATURE_ZOOM
} from '../actions/mapActions';

import {
    buildLayers,
    setLayerVisibility,
    toggleLegend,
    filterCameraLayer,
    queryMapLayer,
    zoomToFeature
} from '../services/arcgisService';

const defaultMapReducerState = {
    layers: null,
    filter: null,
    queryForm: null,
    searchResults: [],
    showSearchResults: false,
    legendVisible: false
};

const mapReducer = (state = defaultMapReducerState, action) => {
    switch (action.type) {

        case MAP_LOAD:
            return {
                ...state,
                layers: buildLayers()
            };

        case LAYER_VISIBILITY_CHANGE:
            setLayerVisibility(action.layerId, action.visible);
            return {
                ...state,
                layers: buildLayers()
            };

        case LEGEND_TOGGLE:
            const legendVisible = !state.legendVisible;
            toggleLegend(legendVisible);
            return {
                ...state,
                legendVisible
            };

        case CAMERA_LAYER_FILTER:
            filterCameraLayer(action.filter);
            return {
                ...state,
                filter: action.filter
            };

        case MAP_LAYER_QUERY:
            queryMapLayer(action.queryForm);
            return {
                ...state,
                queryForm: action.queryForm
            };

        case MAP_LAYER_QUERY_COMPLETE:
            return {
                ...state,
                searchResults: action.searchResults,
                showSearchResults: true
            };

        case SEARCH_RESULTS_HIDE:
            return {
                ...state,
                showSearchResults: false
            };

        case FEATURE_ZOOM:
            zoomToFeature(action.feature, action.zoom);
            return {
                ...state
            };

        default:
            return state;
    }
};

export default mapReducer;