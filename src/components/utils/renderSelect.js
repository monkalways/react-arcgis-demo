import React from 'react';
import { Dropdown, Form, Message } from 'semantic-ui-react';

const renderSelect = (props) => {
    return (
        <Form.Field>
            <label>{props.label}</label>
            <Dropdown 
                {...props.input} 
                placeholder={props.placeholder} 
                selection 
                options={props.options}
                value={props.input.value}
                onChange={(param, data) => props.input.onChange(data.value)} />
            <Message
                negative
                hidden={!(props.meta.touched && props.meta.error)}
                content={props.meta.error}
            />
        </Form.Field>
    );
}

export default renderSelect;