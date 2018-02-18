import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { filterCameraLayer } from '../actions/mapActions';
import renderInput from './utils/renderInput';

const CameraFilter = ({initialValues, pristine, reset, submitting, handleSubmit, filterCameraLayer}) => {

    const onSubmit = (values) => {
        console.log(values);
        filterCameraLayer({
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

// const validate = (values) => {
//     const errors = {};

//     if(!values.cameraNumber) {
//         errors.cameraNumber = 'Enter a camera number';
//     }

//     return errors;
// };

const mapStateToProps = (state) => ({
    initialValues: state.map.filter
});

const CameraFilterReduxForm = reduxForm({
    // validate,
    form: 'camera-filter',
    enableReinitialize: true,
    // keepDirtyOnReinitialize:true,// 这个值表示重新初始化表单后，不替换已更改的值，可以用clear来测试
})(CameraFilter);

export default connect(mapStateToProps, {filterCameraLayer})(CameraFilterReduxForm);