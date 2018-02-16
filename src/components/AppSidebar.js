import React from 'react';
import { Segment, Tab } from 'semantic-ui-react';

import LayerSelector from './LayerSelector';
import CameraFilter from './CameraFilter';

const panes = [
    { menuItem: 'Layers List', render: () => <Tab.Pane><LayerSelector /></Tab.Pane> },
    { menuItem: 'Camera Filter', render: () => <Tab.Pane><CameraFilter /></Tab.Pane> },
    { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 2</Tab.Pane> },
]

const AppSidebar = () => {
    return (
        <Segment basic>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Segment>
    );
}

export default AppSidebar;