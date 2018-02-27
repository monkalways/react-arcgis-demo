import uuid from 'uuid';

import {
    MAP_LOAD,
    LAYER_VISIBILITY_CHANGE,
    LEGEND_TOGGLE,
    MAP_LAYER_FILTER,
    FILTER_ADD,
    FILTER_TOGGLE,
    MAP_LAYER_QUERY,
    MAP_LAYER_QUERY_COMPLETE,
    SEARCH_RESULTS_HIDE,
    FEATURE_ZOOM
} from '../actions/mapActions';

import {
    buildLayers,
    setLayerVisibility,
    toggleLegend,
    filterMapLayer,
    queryMapLayer,
    zoomToFeature
} from '../services/arcgisService';

const defaultMapReducerState = {
    layers: null,
    filters: {},
    filterForm: null,
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

        case MAP_LAYER_FILTER:
            filterMapLayer(action.filterForm);
            return {
                ...state,
                filterForm: action.filterForm
            };

        case FILTER_ADD:
            const newFilter = {
                ...action.filter,
                id: uuid(),
                active: false
            };
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [newFilter.id]: newFilter
                }
            };
        
        case FILTER_TOGGLE:
            const filter = state.filters[action.filterId];
            filter.active = action.active;
            filterMapLayer(filter);
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [filter.id]: filter
                }
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