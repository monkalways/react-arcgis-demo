import React from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

import { hideFilterModal } from '../actions/appActions';
import { addFilter } from '../actions/mapActions';
import renderInput from './utils/renderInput';
import renderSelect from './utils/renderSelect';
import { visibleLayersSelector } from '../selectors/mapSelector';

const FilterForm = ({
    initialValues, layers, // from state
    addFilter, hideFilterModal, // from dispatch
    pristine, reset, submitting, handleSubmit // from redux-form
}) => {

    const onSubmit = (values) => {
        addFilter({
            name: values.name,
            layerId: values.layerId,
            criteria: values.criteria
        });
        hideFilterModal();
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Field name="name" component={renderInput} label="Name" placeholder="Camera layer filter" />
            <Field name="layerId" component={renderSelect} label="Layer" placeholder="Select a layer" options={layers} />
            <Field name="criteria" component={renderInput} label="Criteria" placeholder="CameraNumber LIKE 'Camera800?'" />
            <Button type="submit" disabled={pristine  || submitting} primary>Save</Button>
        </Form>
    );
}

const validate = (values) => {
    const errors = {};

    if(!values.name) {
        errors.name = 'Please select a filter name.';
    }

    if(!values.layerId) {
        errors.layerId = 'Please select a layer.';
    }

    if(!values.criteria) {
        errors.criteria = 'Please enter a criteria.';
    }

    return errors;
};

const FilterFormReduxForm = reduxForm({
    validate,
    form: 'filter-form',
    enableReinitialize: true,
})(FilterForm);

const mapStateToProps = (state) => ({
    initialValues: state.map.filterForm,
    layers: visibleLayersSelector(state).map(layer => ({
        value: layer.id,
        text: layer.title
      }))
});

export default connect(mapStateToProps, {addFilter, hideFilterModal})(FilterFormReduxForm);