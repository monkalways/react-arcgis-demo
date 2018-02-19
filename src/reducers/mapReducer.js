import { esriPromise } from 'react-arcgis';

import { MAP_LOAD, LAYER_VISIBILITY_CHANGE, LEGEND_TOGGLE, CAMERA_LAYER_FILTER, CAMERA_LAYER_QUERY } from '../actions/mapActions';

const CAMERA_LAYER_TITLE = 'Toronto Cameras';

let map = null;
let view = null;
let legend = null;

export const initializeArcGisMap = (mapValue, viewValue) => {
    map = mapValue;
    view = viewValue;
}

const defaultMapReducerState = {
    layers: null,
    filter: null,
    query: null,
    legendVisible: false
};

const setupCameraLayerPopupTemplate = () => {
    const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
    cameraLayer.popupTemplate = {
        title: '#{CameraNumber}',
        content: '<div class="ui segment basic"><div class="ui card"><div class="image"><img src="{NorthReferenceStaticImage}"></div><div class="content">North View</div></div><button type="button" class="ui button" onclick="window.cameraLayerButtonClick()">Click Me</button></div>'
    };
};

const buildLayers = () => {
    const layers = [];
    map.layers.items.map(item => {
        layers.push({
            id: item.id,
            title: item.title,
            visible: item.visible
        });
    })
    return layers;
};

const toggleLegend = (legendVisible) => {
    
    esriPromise(['esri/widgets/Legend']).then(([ Legend ]) => {
        if(!legend) {
            var layerInfos = [];
            map.layers.items.map(layer => {
                return layerInfos.push({
                    layer,
                    title: layer.title
                });
            });
    
            legend = new Legend({
                view,
                layerInfos
            });
        }

        if(legendVisible) {
            // Add widget to the bottom right corner of the view
            view.ui.add(legend, "bottom-right");
            legendVisible = true;
        } else {
            view.ui.remove(legend);
            legendVisible = false;
        }

    }).catch((err) => console.error(err));
    
}

const filterCameraLayer = (filter) => {
    const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
    if(!filter.cameraNumber) {
        cameraLayer.definitionExpression = null;
    } else {
        cameraLayer.definitionExpression = `CameraNumber = '${filter.cameraNumber}'`;
    }
    return cameraLayer.definitionExpression;
}

const queryCameraLayer = (query) => {
    const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
    const queryCameras = cameraLayer.createQuery();
    queryCameras.where = `CameraNumber = '${query.cameraNumber}'`;
    cameraLayer.queryFeatures(queryCameras).then(result => {
        const feature = result.features[0];
        view.goTo({
            target: feature.geometry,
            zoom: 15
        }, {
            duration: 1000,
            easing: 'in-out-expo'
        }).then(() => {
            view.popup.open({
                features: [feature],
                location: feature.geometry
            });
        });
    })
}

const mapReducer = (state = defaultMapReducerState, action) => {
    switch (action.type) {

        case MAP_LOAD:

            setupCameraLayerPopupTemplate();

            // automatically closes the popup when the View camera or Viewpoint changes
            view.popup.autoCloseEnabled = true;

            return {
                ...state,
                layers: buildLayers()
            };

        case LAYER_VISIBILITY_CHANGE:
            const layer = map.layers.items.find(item => item.id === action.layerId);
            layer.visible = action.visible;
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

        case CAMERA_LAYER_QUERY:
            queryCameraLayer(action.query);
            return {
                ...state,
                query: action.query
            };

        default:
            return state;
    }
};

export default mapReducer;