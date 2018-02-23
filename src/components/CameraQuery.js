import React from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Form, Item } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { queryCameraLayer, hideSearchResults } from '../actions/mapActions';
import renderInput from './utils/renderInput';
import CameraSearchResultItem from './CameraSearchResultItem';

const CameraQuery = ({initialValues, pristine, reset, submitting, handleSubmit, queryCameraLayer, searchResults, 
  showSearchResults, hideSearchResults}) => {

  const onSubmit = (values) => {
    queryCameraLayer({
        cameraNumber: values.cameraNumber
      });
  };

  const handleBackToSearch = () => {
    hideSearchResults();
  }

  return (
    <div>
      { !showSearchResults ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field name='cameraNumber' component={renderInput} label="Camera Number" placeholder='Camera8001' />
          <Button type='submit' disabled={pristine  || submitting} primary>Submit</Button>
        </Form>
      ) : (
        <div>
          <Button fluid onClick={handleBackToSearch}>Back to Search</Button>
          <Divider horizontal>Search Results</Divider>
          <Item.Group>
            { searchResults.map(result => (
              <CameraSearchResultItem key={result.uid} {...result.attributes}></CameraSearchResultItem>
            )) }
          </Item.Group>
        </div>
      ) }
    </div>
  );
}

const mapStateToProps = ({map}) => ({
  initialValues: map.query,
  searchResults: map.searchResults,
  showSearchResults: map.showSearchResults
});

const CameraQueryReduxForm = reduxForm({
  // validate,
  form: 'camera-query',
  enableReinitialize: true,
  // keepDirtyOnReinitialize:true,// 这个值表示重新初始化表单后，不替换已更改的值，可以用clear来测试
})(CameraQuery);

export default connect(mapStateToProps, {queryCameraLayer, hideSearchResults})(CameraQueryReduxForm);