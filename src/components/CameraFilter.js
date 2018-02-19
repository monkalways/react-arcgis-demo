import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { filterCameraLayer } from '../actions/mapActions';
import renderInput from './utils/renderInput';

const CameraFilter = ({initialValues, pristine, reset, submitting, handleSubmit, filterCameraLayer}) => {

    const onSubmit = (values) => {
        filterCameraLayer({
            cameraNumber: values.cameraNumber
        });
    };

    const handleClearFilters = () => {
        filterCameraLayer({
            cameraNumber: null
        });
    };

    const isClearFilterButtonDisabled = () => {
        return !(initialValues && initialValues.cameraNumber);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Field name='cameraNumber' component={renderInput} label="Camera Number" placeholder='Camera8001' />
            <Button type='submit' disabled={pristine  || submitting} primary>Submit</Button>
            <Button disabled={isClearFilterButtonDisabled() || submitting} onClick={handleClearFilters}>Clear Filters</Button>
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
})(CameraFilter);

export default connect(mapStateToProps, {filterCameraLayer})(CameraFilterReduxForm);