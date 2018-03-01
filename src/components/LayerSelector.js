import React from 'react';
import { connect } from 'react-redux';
import { Checkbox, Divider, Form, Header } from 'semantic-ui-react';

import { changeLayerVisibility } from '../actions/mapActions';

const LayerSelector = ({layers, changeLayerVisibility}) => {
    const renderContent = () => {
        if(!layers) {
            return (
                <div>Map is not loaded</div>
            )
        }

        return (
            <div>
                {layers.map(layer => (
                    <Form.Field key={layer.title} >
                        <Checkbox 
                            label={layer.title} 
                            checked={layer.visible} 
                            onChange={(event, data) => changeLayerVisibility(layer.title, data.checked)} />
                    </Form.Field>
                ))}
            </div>
        );
    }

    return (
        <div>  
            <Header>Layer List</Header>
            <Divider />
            {renderContent()}
        </div>
    );
}

const mapStateToProps = ({map}) => ({
    layers: map.layers
})

export default connect(mapStateToProps, {changeLayerVisibility})(LayerSelector);