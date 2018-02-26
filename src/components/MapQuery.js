import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form, Item } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { CAMERA_LAYER_ID, SCHOOL_LAYER_ID, NEIGHBORHOOD_LAYER_ID } from '../services/arcgisService';
import { queryMapLayer, hideSearchResults } from '../actions/mapActions';
import renderInput from './utils/renderInput';
import renderSelect from './utils/renderSelect';
import CameraSearchResultItem from './CameraSearchResultItem';
import SchoolSearchResultItem from './SchoolSearchResultItem';
import NeighborhoodSearchResultItem from './NeighborhoodSearchResultItem';
import { visibleLayersSelector } from '../selectors/mapSelector';

const MapQuery = ({initialValues, pristine, reset, submitting, handleSubmit, queryMapLayer, searchResults, 
  showSearchResults, hideSearchResults, layers}) => {

  const onSubmit = (values) => {
    queryMapLayer({
      layerId: values.layerId,
      query: values.query
    });
  };

  const handleBackToSearch = () => {
    hideSearchResults();
  };

  const renderSearchResultItem = () => {
    switch (initialValues.layerId) {
      case CAMERA_LAYER_ID:
        return searchResults.map(result => (
          <CameraSearchResultItem key={result.uid} {...result.attributes}></CameraSearchResultItem>
        ));
      case SCHOOL_LAYER_ID:
        return searchResults.map(result => (
          <SchoolSearchResultItem key={result.uid} {...result.attributes}></SchoolSearchResultItem>
        ));
      case NEIGHBORHOOD_LAYER_ID:
        return searchResults.map(result => (
          <NeighborhoodSearchResultItem key={result.uid} {...result.attributes}></NeighborhoodSearchResultItem>
        ));
    }
  };

  return (
    <div>
      { !showSearchResults ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field name="layerId" component={renderSelect} label="Layer" placeholder="Select a layer" options={layers} />
          <Field name='query' component={renderInput} label="Query" placeholder="CameraNumber LIKE 'Camera800?'" />
          <Button type='submit' disabled={pristine  || submitting} primary>Submit</Button>
        </Form>
      ) : (
        <div>
          <Button fluid onClick={handleBackToSearch}>Back to Search</Button>
          <Divider horizontal>Search Results</Divider>
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
  layers: visibleLayersSelector(state).map(layer => ({
    value: layer.id,
    text: layer.title
  }))
});

const validate = (formProps) => {
  const errors = {};

  if (!formProps.layer) {
    errors.layer = 'Please select a layer';
  }

  if (!formProps.cameraNumber) {
    errors.cameraNumber = 'Please enter a camera number';
  }

  return errors;
}

const MapQueryReduxForm = reduxForm({
  validate,
  form: 'map-query',
  enableReinitialize: true,
})(MapQuery);

export default connect(mapStateToProps, {queryMapLayer, hideSearchResults})(MapQueryReduxForm);