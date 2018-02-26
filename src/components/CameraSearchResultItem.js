import React from 'react';
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';

import { zoomToFeature } from '../actions/mapActions';

const CameraSearchResultItem = ({feature, zoomToFeature}) => {
    const handleItemClick = () => {
        zoomToFeature(feature);
    };

    return (
        <Item>
            <Item.Image size='small' src={feature.attributes.NorthReferenceStaticImage} />
            <Item.Content verticalAlign='middle'>
                <Item.Description as='a' onClick={handleItemClick}>#{feature.attributes.CameraNumber}</Item.Description>
            </Item.Content>
        </Item>
    );
};

export default connect(null, {zoomToFeature})(CameraSearchResultItem);