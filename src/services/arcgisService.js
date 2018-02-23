import { esriPromise } from 'react-arcgis';

import store from '../store';
import { completeQueryCameraLayer } from '../actions/mapActions';

const CAMERA_LAYER_TITLE = 'Toronto Cameras';

let map = null;
let view = null;
let legend = null;

export const initializeArcGisMap = (mapValue, viewValue) => {
    map = mapValue;
    view = viewValue;
    
    // automatically closes the popup when the View camera or Viewpoint changes
    view.popup.autoCloseEnabled = true;

    setupCameraLayerPopupTemplate();
    // setupZoomEventHandler();
};

const setupCameraLayerPopupTemplate = () => {
  const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
  cameraLayer.popupTemplate = {
      title: '#{CameraNumber}',
      content: '<div class="ui segment basic"><div class="ui card"><div class="image"><img src="{NorthReferenceStaticImage}"></div><div class="content">North View</div></div><button type="button" class="ui button" onclick="window.cameraLayerButtonClick()">Click Me</button></div>'
  };
};

// const setupZoomEventHandler = () => {
//     esriPromise(['esri/core/watchUtils']).then(([ watchUtils ]) => {
//         watchUtils.watch(view, "scale", function() {
//             console.log('Map scale changed: ', view.scale);
//         });
  
//     }).catch((err) => console.error(err));
// } 

export const buildLayers = () => {
  const layers = [];
  map.layers.items.map(item => {
      return layers.push({
          id: item.id,
          title: item.title,
          visible: item.visible
      });
  })
  return layers;
};

export const setLayerVisibility = (layerId, visible) => {
  const layer = map.layers.items.find(item => item.id === layerId);
  layer.visible = visible;
};

export const toggleLegend = (legendVisible) => {
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
};

export const filterCameraLayer = (filter) => {
  const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
  if(!filter.cameraNumber) {
      cameraLayer.definitionExpression = null;
  } else {
      cameraLayer.definitionExpression = `CameraNumber = '${filter.cameraNumber}'`;
  }
  return cameraLayer.definitionExpression;
};

export const queryCameraLayer = (query) => {
  const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
  const queryCameras = cameraLayer.createQuery();
  queryCameras.where = `CameraNumber = '${query.cameraNumber}'`;
  cameraLayer.queryFeatures(queryCameras).then(result => {
      // zoom to first feature returned
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

      // trigger completeQueryCameraLayer
      console.log(result.features);
      store.dispatch(completeQueryCameraLayer(result.features));
  });
};