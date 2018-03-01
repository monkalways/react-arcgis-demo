import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form, Header, Item } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { CAMERA_LAYER_TITLE, SCHOOL_LAYER_TITLE, NEIGHBORHOOD_LAYER_TITLE } from '../constants';
import { toggleDataTable } from '../actions/appActions';
import { queryMapLayer, hideSearchResults } from '../actions/mapActions';
import renderInput from './utils/renderInput';
import renderSelect from './utils/renderSelect';
import CameraSearchResultItem from './CameraSearchResultItem';
import SchoolSearchResultItem from './SchoolSearchResultItem';
import NeighborhoodSearchResultItem from './NeighborhoodSearchResultItem';
import { visibleLayersSelector } from '../selectors/mapSelector';

const MapQuery = ({initialValues, pristine, reset, submitting, handleSubmit, queryMapLayer, searchResults, 
  showSearchResults, hideSearchResults, layers, toggleDataTable, dataTableVisible}) => {

  const onSubmit = (values) => {
    queryMapLayer({
      layerTitle: values.layerTitle,
      criteria: values.criteria
    });
  };

  const handleBackToSearch = () => {
    hideSearchResults();
  };

  const handleShowTable = () => {
    toggleDataTable();
  };

  const renderSearchResultItem = () => {
    switch (initialValues.layerTitle) {
      case CAMERA_LAYER_TITLE:
        return searchResults.map(feature => (
          <CameraSearchResultItem key={feature.uid} feature={feature}></CameraSearchResultItem>
        ));
      case SCHOOL_LAYER_TITLE:
        return searchResults.map(feature => (
          <SchoolSearchResultItem key={feature.uid} feature={feature}></SchoolSearchResultItem>
        ));
      case NEIGHBORHOOD_LAYER_TITLE:
        return searchResults.map(feature => (
          <NeighborhoodSearchResultItem key={feature.uid} feature={feature}></NeighborhoodSearchResultItem>
        ));
      default:
        return (
          <div>Unknown layer item type</div>
        );
    }
  };

  return (
    <div>
      <Header>Query</Header>
      <Divider />
      { !showSearchResults ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field name="layerTitle" component={renderSelect} label="Layer" placeholder="Select a layer" options={layers} />
          <Field name='criteria' component={renderInput} label="Query" placeholder="CameraNumber LIKE 'Camera800%'" />
          <Button type='submit' disabled={pristine  || submitting} primary>Submit</Button>
        </Form>
      ) : (
        <div>
          <Button fluid onClick={handleBackToSearch}>Back to Search</Button>
          <Divider horizontal>Search Results</Divider>
          <Button fluid onClick={handleShowTable}>{!dataTableVisible? 'Show Table' : 'Hide Table'}</Button>
          { searchResults && searchResults.length > 0 ? (
            <Item.Group>
              {renderSearchResultItem()}
            </Item.Group>
          ) : (
            <p>No matches found.</p>
          )}
          
        </div>
      ) }
    </div>
  );
}

const mapStateToProps = (state) => ({
  initialValues: state.map.queryForm,
  searchResults: state.map.searchResults,
  showSearchResults: state.map.showSearchResults,
  dataTableVisible: state.app.dataTableVisible,
  layers: visibleLayersSelector(state).map(layer => ({
    value: layer.title,
    text: layer.title
  }))
});

const validate = (formProps) => {
  const errors = {};

  if (!formProps.layerTitle) {
    errors.layerTitle = 'Please select a layer.';
  }

  if (!formProps.criteria) {
    errors.criteria = 'Please enter a criteria.';
  }

  return errors;
}

const MapQueryReduxForm = reduxForm({
  validate,
  form: 'query-form',
  enableReinitialize: true,
})(MapQuery);

export default connect(mapStateToProps, {queryMapLayer, hideSearchResults, toggleDataTable})(MapQueryReduxForm);