import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { filterCameraLayer } from '../actions/mapActions';

const renderInput = (props) => (
    <Form.Field>
        <label>{props.label}</label>
        <Input {...props.input} placeholder={props.placeholder} />
        <Message
            negative
            hidden={!(props.meta.touched && props.meta.error)}
            content={props.meta.error}
        />
    </Form.Field>
);

const CameraFilter = ({initialValues, handleSubmit, filterCameraLayer}) => {

    const onSubmit = (values) => {
        console.log(values);
        filterCameraLayer(values.cameraNumber);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Field name='cameraNumber' component={renderInput} label="Camera Number" placeholder='Camera8001' />
            <Button type='submit' primary>Submit</Button>
        </Form>
    );
}

const validate = (values) => {
    const errors = {};

    if(!values.cameraNumber) {
        errors.cameraNumber = 'Enter a camera number';
    }

    return errors;
};

const mapStateToProps = (state) => ({
    initialValues: {
        cameraNumber: state.map.cameraNumber
    }
});

const CameraFilterRedux = connect(mapStateToProps, {filterCameraLayer})(CameraFilter);

export default reduxForm({
    validate,
    form: 'camera-filter',
    enableReinitialize: true
})(CameraFilterRedux);