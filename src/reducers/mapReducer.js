import { esriPromise } from 'react-arcgis';

import { MAP_LOAD, LAYER_VISIBILITY_CHANGE, LEGEND_TOGGLE, CAMERA_LAYER_FILTER, CAMERA_LAYER_QUERY } from '../actions/mapActions';

const CAMERA_LAYER_TITLE = 'Toronto Cameras';

const defaultMapReducerState = {
    map: null,
    view: null,
    layers: null,
    filter: null,
    query: null
};

const setupCameraLayerPopupTemplate = (map) => {
    const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
    cameraLayer.popupTemplate = {
        title: '#{CameraNumber}',
        content: '<div class="ui segment basic"><div class="ui card"><div class="image"><img src="{NorthReferenceStaticImage}"></div><div class="content">North View</div></div><button type="button" class="ui button" onclick="window.cameraLayerButtonClick()">Click Me</button></div>'
    };
};

const buildLayers = (map) => {
    const layers = [
        ...map.layers.items
    ];
    return layers;
};

let legend;
let legendVisible = false;
const toggleLegend = (map, view) => {
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

        if(!legendVisible) {
            // Add widget to the bottom right corner of the view
            view.ui.add(legend, "bottom-right");
            legendVisible = true;
        } else {
            view.ui.remove(legend);
            legendVisible = false;
        }
        
    }).catch((err) => console.error(err));
}

const filterCameraLayer = (map, view, filter) => {
    const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
    if(!filter.cameraNumber) {
        cameraLayer.definitionExpression = null;
    } else {
        cameraLayer.definitionExpression = `CameraNumber = '${filter.cameraNumber}'`;
    }
    return cameraLayer.definitionExpression;
}

const queryCameraLayer = (map, view, query) => {
    console.log(view);
    console.log('query camera layer', query);

    const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
    const queryCameras = cameraLayer.createQuery();
    queryCameras.where = `CameraNumber = '${query.cameraNumber}'`;
    cameraLayer.queryFeatures(queryCameras).then(result => {
        const feature = result.features[0];

        console.log(feature.geometry);

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
            
            setupCameraLayerPopupTemplate(action.map);

            // automatically closes the popup when the View camera or Viewpoint changes
            action.view.popup.autoCloseEnabled = true;

            return {
                map: action.map,
                view: action.view,
                layers: buildLayers(action.map)
            };

        case LAYER_VISIBILITY_CHANGE:
            // const newMap = { ...state.map };
            const layer = state.map.allLayers.items.find(item => item.id === action.layerId);
            layer.visible = action.visible;
            return {
                ...state,
                layers: buildLayers(state.map)
            };

        case LEGEND_TOGGLE:
            toggleLegend(state.map, state.view);
            return state;

        case CAMERA_LAYER_FILTER:
            filterCameraLayer(state.map, action.filter);
            return {
                ...state,
                filter: action.filter
            };

        case CAMERA_LAYER_QUERY:
            queryCameraLayer(state.map, state.view, action.query);
            return {
                ...state,
                query: action.query
            };

        default:
            return state;
    }
};

export default mapReducer;