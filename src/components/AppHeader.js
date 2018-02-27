import React from 'react';
import { connect } from 'react-redux';
import { Button, Menu, Popup } from 'semantic-ui-react';

import { toggleSidebar } from '../actions/appActions';
import { toggleLegend } from '../actions/mapActions';

import logo from '../logo.svg';
import './AppHeader.css';

const AppHeader = ({toggleSidebar, toggleLegend}) => {
    return (
        <Menu color="violet" inverted fixed="top">
            <Menu.Item>
                <img src={logo} className="App-logo" alt="logo" />
            </Menu.Item>

            <Menu.Item header key="dashboard" name="React ArcGIS Demo" active={true}>
            </Menu.Item>

            <Menu.Item position="right" fitted>
                <Popup
                    size="tiny"
                    trigger={<Button icon="list layout" color="violet" onClick={(event, data) => toggleLegend()}></Button>}
                    content="Toggle legend"
                />
                <Popup
                    size="tiny"
                    trigger={<Button icon="sidebar" color="violet" onClick={(event, data) => toggleSidebar()}></Button>}
                    content="Toggle sidebar"
                />
            </Menu.Item>
            
        </Menu>
    );
}

export default connect(null, {toggleSidebar, toggleLegend})(AppHeader);