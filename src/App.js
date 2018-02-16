import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar } from 'semantic-ui-react';

import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import MapContainer from './components/MapContainer';

import './App.css';

const mainContainerStyle = {
  marginTop: 47
};

const mapContainerStyle = {
  height: '94vh',
  width: '100vw'
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <div style={mainContainerStyle}>
          <Sidebar.Pushable>
            <Sidebar animation='slide along' direction='right' width='wide' visible={this.props.sidebarVisible} icon='labeled'>
              <AppSidebar />
            </Sidebar>
            <Sidebar.Pusher>
                <div style={mapContainerStyle}>
                  <MapContainer />
                </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarVisible: state.app.sidebarVisible
  };
}

export default connect(mapStateToProps)(App);
