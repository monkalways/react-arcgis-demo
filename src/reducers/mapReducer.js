import { esriPromise } from 'react-arcgis';

import { MAP_LOAD, LAYER_VISIBILITY_CHANGE, LEGEND_TOGGLE, CAMERA_LAYER_FILTER } from '../actions/mapActions';

const CAMERA_LAYER_TITLE = 'Toronto Cameras';

const defaultMapReducerState = {
    map: null,
    view: null,
    layers: null,
    cameraNumber: null
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

const filterCameraLayer = (map, cameraNumber) => {
    const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
    cameraLayer.definitionExpression = `CameraNumber = '${cameraNumber}'`;
    return cameraLayer.definitionExpression;
}

const mapReducer = (state = defaultMapReducerState, action) => {
    switch (action.type) {

        case MAP_LOAD:
            console.log(action.map.layers.items);
            setupCameraLayerPopupTemplate(action.map);

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
            filterCameraLayer(state.map, action.cameraNumber);
            return {
                ...state,
                cameraNumber: action.cameraNumber
            };
        default:
            return state;
    }
};

export default mapReducer;