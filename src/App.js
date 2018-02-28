import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar } from 'semantic-ui-react';

import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import MapContainer from './components/MapContainer';
import FilterModal from './components/FilterModal';
import DataTable from './components/DataTable';

import './App.css';

const outerPushableStyle = {
  overflow: 'hidden'
};

const pusherStyle = {
  height: '100%',
  width: '100%'
};

const mapContainerStyle = {
  height: '100%',
  width: '100%'
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <div className="Content">
          <Sidebar.Pushable style={outerPushableStyle}>
            <Sidebar animation="overlay" direction="bottom" width="very wide" visible={this.props.dataTableVisible} icon="labeled">
              <DataTable />
            </Sidebar>
            <Sidebar.Pusher style={pusherStyle}>
              <Sidebar.Pushable>
                <Sidebar animation="slide along" direction="right" width="very wide" visible={this.props.sidebarVisible} icon="labeled">
                  <AppSidebar />
                </Sidebar>
                <Sidebar.Pusher style={pusherStyle}>
                    <MapContainer style={mapContainerStyle}/>
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
        <FilterModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sidebarVisible: state.app.sidebarVisible,
    dataTableVisible: state.app.dataTableVisible
  };
}

export default connect(mapStateToProps)(App);
