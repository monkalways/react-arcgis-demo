import { esriPromise } from 'react-arcgis';

import store from '../store';
import { completeQueryMapLayer } from '../actions/mapActions';

export const CAMERA_LAYER_ID = 'Toronto_Cameras_6835';
export const SCHOOL_LAYER_ID = 'Toronto_Schools_5846';
export const NEIGHBORHOOD_LAYER_ID = 'Toronto_Neighbourhoods_2016_Crime_1374';

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
  const cameraLayer = map.layers.items.find(item => item.id === CAMERA_LAYER_ID);
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
  map.layers.items.forEach(item => {
      layers.push({
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

export const filterMapLayer = (filterForm) => {
  const layer = map.layers.items.find(item => item.id === filterForm.layerId);
  if(!filterForm.criteria) {
      layer.definitionExpression = null;
  } else {
      layer.definitionExpression = filterForm.criteria;
  }
  return layer.definitionExpression;
};

export const queryMapLayer = (queryForm) => {
  const layer = map.layers.items.find(item => item.id === queryForm.layerId);
  const queryObj = layer.createQuery();
  queryObj.where = queryForm.query;
  layer.queryFeatures(queryObj).then(result => {

    if(result.features.length > 0) {
        // zoom to first feature returned
        const feature = result.features[0];
        let zoom = 15;
        if (queryForm.layerId === NEIGHBORHOOD_LAYER_ID) {
           zoom = 13;
        }

        view.goTo({
            target: feature.geometry,
            zoom
        }, {
            duration: 500,
            easing: 'in-out-expo'
        }).then(() => {
            view.popup.open({
                features: [feature],
                location: feature.geometry
            });
        });
    }

    // trigger completeQueryCameraLayer
    console.log(result.features);
    store.dispatch(completeQueryMapLayer(result.features));
  });
};

export const zoomToFeature = (feature, zoom) => {
    view.goTo({
        target: feature.geometry,
        zoom
    }, {
        duration: 500,
        easing: 'in-out-expo'
    }).then(() => {
        view.popup.open({
            features: [feature],
            location: feature.geometry
        });
    });
}