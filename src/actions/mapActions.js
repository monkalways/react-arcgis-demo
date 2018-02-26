export const MAP_LOAD = 'MAP_LOAD';
export const LAYER_VISIBILITY_CHANGE = 'LAYER_VISIBILITY_CHANGE';
export const LEGEND_TOGGLE = 'LEGEND_TOGGLE';
export const CAMERA_LAYER_FILTER = 'CAMERA_LAYER_FILTER';
export const MAP_LAYER_QUERY = 'MAP_LAYER_QUERY';
export const MAP_LAYER_QUERY_COMPLETE = 'MAP_LAYER_QUERY_COMPLETE';
export const SEARCH_RESULTS_HIDE = 'SEARCH_RESULTS_HIDE';
export const FEATURE_ZOOM = 'FEATURE_ZOOM';

export const loadMap = () => ({
    type: MAP_LOAD
});

export const changeLayerVisibility = (layerId, visible) => ({
    type: LAYER_VISIBILITY_CHANGE,
    layerId,
    visible
});

export const toggleLegend = () => ({
    type: LEGEND_TOGGLE
});

export const filterCameraLayer = (filter) => ({
    type: CAMERA_LAYER_FILTER,
    filter
});

export const queryMapLayer = (queryForm) => ({
    type: MAP_LAYER_QUERY,
    queryForm
});

export const completeQueryMapLayer = (searchResults) => ({
    type: MAP_LAYER_QUERY_COMPLETE,
    searchResults
});

export const hideSearchResults = () => ({
    type: SEARCH_RESULTS_HIDE
});

export const zoomToFeature = (feature, zoom = 15) => ({
    type: FEATURE_ZOOM,
    feature,
    zoom
});