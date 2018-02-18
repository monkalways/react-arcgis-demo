import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { queryCameraLayer } from '../actions/mapActions';
import renderInput from './utils/renderInput';

const CameraQuery = ({initialValues, pristine, reset, submitting, handleSubmit, queryCameraLayer}) => {

  const onSubmit = (values) => {
    queryCameraLayer({
        cameraNumber: values.cameraNumber
      });
  };

  return (
      <Form onSubmit={handleSubmit(onSubmit)}>
          <Field name='cameraNumber' component={renderInput} label="Camera Number" placeholder='Camera8001' />
          <Button type='submit' disabled={pristine  || submitting} primary>Submit</Button>
      </Form>
  );
}

const mapStateToProps = (state) => ({
  initialValues: state.map.query
});

const CameraQueryReduxForm = reduxForm({
  // validate,
  form: 'camera-query',
  enableReinitialize: true,
  // keepDirtyOnReinitialize:true,// 这个值表示重新初始化表单后，不替换已更改的值，可以用clear来测试
})(CameraQuery);

export default connect(mapStateToProps, {queryCameraLayer})(CameraQueryReduxForm);