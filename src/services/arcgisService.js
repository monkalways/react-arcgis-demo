import { esriPromise } from 'react-arcgis';

import store from '../store';
import { completeQueryMapLayer } from '../actions/mapActions';
import { CAMERA_LAYER_TITLE, NEIGHBORHOOD_LAYER_TITLE } from '../constants';

let map = null;
let view = null;
let legend = null;

export const initializeArcGisMap = (mapValue, viewValue) => {
    map = mapValue;
    view = viewValue;

    setupMapViewWidgets();
    setupViewPopupTriggerActions();
    // setupZoomEventHandler();
    
    // automatically closes the popup when the View camera or Viewpoint changes
    view.popup.autoCloseEnabled = true;

    setupCameraLayerPopupTemplate();
};

const setupMapViewWidgets = () => {
    esriPromise(['esri/widgets/BasemapToggle', 'esri/widgets/ScaleBar', 'esri/widgets/Compass']).then(([ BasemapToggle, ScaleBar, Compass ]) => {
        var toggle = new BasemapToggle({
            view: view,
            nextBasemap: 'satellite'
        });
        view.ui.add(toggle, "bottom-right");

        var scaleBar = new ScaleBar({
            view: view
        });
        view.ui.add(scaleBar, "bottom-left");

        var compass = new Compass({
            view: view
        });
        view.ui.add(compass, "top-left");

    }).catch((err) => console.error(err));
};

const setupViewPopupTriggerActions = () => {
    view.popup.viewModel.on('trigger-action', ({ action }) => {
        console.log(action);
        if(action.id === 'camera-details') {
            const attributes = view.popup.viewModel.selectedFeature.attributes;
            const northReferenceStaticImage = attributes.NorthReferenceStaticImage;
            window.open(northReferenceStaticImage);
        }
    });
}

const setupCameraLayerPopupTemplate = () => {
  const cameraLayer = map.layers.items.find(item => item.title === CAMERA_LAYER_TITLE);
  cameraLayer.popupTemplate = {
      title: '#{CameraNumber}',
      content: `
        <div class="ui segment basic">
            <div class="ui card">
                <div class="image"><img src="{NorthReferenceStaticImage}"></div>
                <div class="content">North View</div>
            </div>
            <div class="ui card">
                <div class="image"><img src="{SouthReferenceStaticImage}"></div>
                <div class="content">South View</div>
            </div>
            <button type="button" class="ui button" onclick="window.cameraLayerButtonClick()">Click Me</button>
        </div>`,
        actions: [{
            id: 'camera-details',
            className: 'esri-icon-applications',
            title: 'Details'
        }]
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
          title: item.title,
          visible: item.visible
      });
  })
  return layers;
};

export const setLayerVisibility = (layerTitle, visible) => {
  const layer = map.layers.items.find(item => item.title === layerTitle);
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

export const filterMapLayer = (filter) => {
  const layer = map.layers.items.find(item => item.title === filter.layerTitle);
  if(!filter.active || !filter.criteria) {
      layer.definitionExpression = null;
  } else {
      layer.definitionExpression = filter.criteria;
  }
  return layer.definitionExpression;
};

export const queryMapLayer = (queryForm) => {
  const layer = map.layers.items.find(item => item.title === queryForm.layerTitle);
  const queryObj = layer.createQuery();
  queryObj.where = queryForm.criteria;
  layer.queryFeatures(queryObj).then(result => {

    if(result.features.length > 0) {
        // zoom to first feature returned
        const feature = result.features[0];
        let zoom = 15;
        if (queryForm.layerTitle === NEIGHBORHOOD_LAYER_TITLE) {
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
};

export const getBasemap = () => {
    return map.basemap.title;
}

export const changeBasemap = (basemap) => {
    map.basemap = basemap;
};