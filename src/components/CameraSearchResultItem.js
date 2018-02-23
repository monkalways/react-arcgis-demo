import React from 'react';
import { Item } from 'semantic-ui-react';

const CameraSearchResultItem = ({CameraNumber: cameraNumber, NorthReferenceStaticImage: northReferenceStaticImage}) => {
    return (
        <Item>
            <Item.Image size='small' src={northReferenceStaticImage} />
            <Item.Content verticalAlign='middle'>
                <Item.Header as='a'>#{cameraNumber}</Item.Header>
            </Item.Content>
        </Item>
    );
}

export default CameraSearchResultItem;