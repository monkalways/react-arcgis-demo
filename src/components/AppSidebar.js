import React from 'react';
import { Segment, Tab } from 'semantic-ui-react';

import LayerSelector from './LayerSelector';
import MapFilter from './MapFilter';
import MapQuery from './MapQuery';
import BasemapGallery from './BasemapGallery';

const panes = [
    { 
        menuItem: { key: 'layersList', icon: 'bars', content: 'Layers'}, 
        render: () => <Tab.Pane><LayerSelector /></Tab.Pane> 
    },
    { 
        menuItem: { key: 'filter', icon: 'filter', content: 'Filters'},
        render: () => <Tab.Pane><MapFilter /></Tab.Pane> 
    },
    { 
        menuItem: { key: 'search', icon: 'search', content: 'Query'},
        render: () => <Tab.Pane><MapQuery /></Tab.Pane> 
    },
    { 
        menuItem: { key: 'basemap', icon: 'block layout', content: 'Basemap'},
        render: () => <Tab.Pane><BasemapGallery /></Tab.Pane> 
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