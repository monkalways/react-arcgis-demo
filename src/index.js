import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { loadCss } from 'esri-loader';

import 'semantic-ui-css/semantic.min.css';

import './index.css';
import App from './App';
import store from './store';

loadCss('https://js.arcgis.com/4.6/esri/css/main.css');

const cameraLayerButtonClick = () => {
    alert('global 123');
};

window.cameraLayerButtonClick = cameraLayerButtonClick;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
    
registerServiceWorker();
