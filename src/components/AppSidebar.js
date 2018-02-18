import React from 'react';
import { Segment, Tab } from 'semantic-ui-react';

import LayerSelector from './LayerSelector';
import CameraFilter from './CameraFilter';
import CameraQuery from './CameraQuery';

const panes = [
    { menuItem: 'Layers List', render: () => <Tab.Pane><LayerSelector /></Tab.Pane> },
    { menuItem: 'Camera Filter', render: () => <Tab.Pane><CameraFilter /></Tab.Pane> },
    { menuItem: 'Camera Query', render: () => <Tab.Pane><CameraQuery /></Tab.Pane> },
]

const AppSidebar = () => {
    return (
        <Segment basic>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Segment>
    );
}

export default AppSidebar;