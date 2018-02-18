import React from 'react';
import { Form, Input, Message } from 'semantic-ui-react';

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

export default renderInput;