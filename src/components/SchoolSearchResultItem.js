import React from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

import { zoomToFeature } from '../actions/mapActions';

const SchoolSearchResultItem = ({feature, zoomToFeature}) => {
    const handleItemClick = () => {
        zoomToFeature(feature);
    };
    
    return (
        <Item>
            <Item.Content verticalAlign='middle'>
                <Item.Description as='a' onClick={handleItemClick}>{feature.attributes.NAME}</Item.Description>
            </Item.Content>
        </Item>
    );
}

export default connect(null, {zoomToFeature})(SchoolSearchResultItem);