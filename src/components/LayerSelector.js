import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Form } from 'semantic-ui-react';

import { changeLayerVisibility } from '../actions/mapActions';

const LayerSelector = ({layers, changeLayerVisibility}) => {
    if(!layers) {
        return (
            <div>Map is not loaded</div>
        )
    }

    return (
        <div>
            {layers.map(layer => (
                <Form.Field key={layer.id} >
                    <Checkbox 
                        label={layer.title} 
                        checked={layer.visible} 
                        onChange={(event, data) => changeLayerVisibility(layer.id, data.checked)} />
                </Form.Field>
            ))}
        </div>
    );
}

const mapStateToProps = ({map}) => ({
    layers: map.layers
})

export default connect(mapStateToProps, {changeLayerVisibility})(LayerSelector);