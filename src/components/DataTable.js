import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Segment, Table } from 'semantic-ui-react';

import { toggleDataTable } from '../actions/appActions';

const containerStyle = {
    height: 500
};

const tableContainerStyle = {
    height: '100%',
    overflowX: 'scroll',
    overflowY: 'scroll',
    marginTop: 20
};

const DataTable = ({searchResults, queryForm, toggleDataTable}) => {

    const handleCloseButton = () => {
        toggleDataTable();
    };
 
    if(!searchResults || searchResults.length === 0) {
        return (
            <Segment style={{ height: 300 }}>
                <Button icon="remove" size="tiny" floated="right" onClick={handleCloseButton}></Button>
                <div>
                    <Header>No search results yet. </Header>
                    <p>Please perform a query first.</p>
                </div>
            </Segment>
        )
    }

    const attributeNames = [];
    _.forOwn(searchResults[0].attributes, (value, key) => {
        attributeNames.push(key);
    });

    return (
        <div style={containerStyle}>
            <Segment>
                <Button icon="remove" size="tiny" floated="right" onClick={handleCloseButton}></Button>
                <div>
                    <Header as='h3'>{queryForm.layerId}</Header>
                    <div style={tableContainerStyle}>
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    {attributeNames.map(attributeName => (
                                        <Table.HeaderCell key={attributeName}>{attributeName}</Table.HeaderCell>
                                    ))}
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {searchResults.map((result, index) => (
                                    <Table.Row key={index}>
                                        {_.map(result.attributes, (value, key) => (
                                            <Table.Cell singleLine key={key}>{value}</Table.Cell>
                                        ))}
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </Segment>
        </div>
        
    );
}

const mapStateToProps = (state) => ({
    searchResults: state.map.searchResults,
    queryForm: state.map.queryForm
})

export default connect(mapStateToProps, {toggleDataTable})(DataTable);