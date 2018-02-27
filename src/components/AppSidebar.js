import React from 'react';
import { Segment, Tab } from 'semantic-ui-react';

import LayerSelector from './LayerSelector';
import CameraFilter from './CameraFilter';
import MapQuery from './MapQuery';

const panes = [
    { 
        menuItem: { key: 'layersList', icon: 'bars', content: 'Layers'}, 
        render: () => <Tab.Pane><LayerSelector /></Tab.Pane> 
    },
    { 
        menuItem: { key: 'cameraFilter', icon: 'filter', content: 'Filter'},
        render: () => <Tab.Pane><CameraFilter /></Tab.Pane> 
    },
    { 
        menuItem: { key: 'cameraFilter', icon: 'search', content: 'Query'},
        render: () => <Tab.Pane><MapQuery /></Tab.Pane> 
    }
]

const AppSidebar = () => {
    return (
        <Segment basic>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Segment>
    );
}

export default AppSidebar;