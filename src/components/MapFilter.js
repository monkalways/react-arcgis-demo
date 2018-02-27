import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { filterMapLayer } from '../actions/mapActions';
import renderInput from './utils/renderInput';
import renderSelect from './utils/renderSelect';
import { visibleLayersSelector } from '../selectors/mapSelector';

const MapFilter = ({initialValues, pristine, reset, submitting, handleSubmit, filterMapLayer, layers}) => {

    const onSubmit = (values) => {
        filterMapLayer({
            layerId: values.layerId,
            criteria: values.criteria
        });
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Field name="layerId" component={renderSelect} label="Layer" placeholder="Select a layer" options={layers} />
            <Field name='criteria' component={renderInput} label="Criteria" placeholder="CameraNumber LIKE 'Camera800?'" />
            <Button type='submit' disabled={pristine  || submitting} primary>Filter</Button>
        </Form>
    );
}

const validate = (values) => {
    const errors = {};

    if(!values.layerId) {
        errors.layerId = 'Please select a layer.';
    }

    if(!values.criteria) {
        errors.criteria = 'Please enter a criteria.';
    }

    return errors;
};

const mapStateToProps = (state) => ({
    initialValues: state.map.filterForm,
    layers: visibleLayersSelector(state).map(layer => ({
        value: layer.id,
        text: layer.title
      }))
});

const MapFilterReduxForm = reduxForm({
    validate,
    form: 'filter-form',
    enableReinitialize: true,
})(MapFilter);

export default connect(mapStateToProps, {filterMapLayer})(MapFilterReduxForm);