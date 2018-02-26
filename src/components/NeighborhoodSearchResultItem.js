import React from 'react';
import { Item } from 'semantic-ui-react';

const NeighborhoodSearchResultItem = ({AREA_NAME: name}) => {
    return (
        <Item>
            <Item.Content verticalAlign='middle'>
                <Item.Description as='a'>{name}</Item.Description>
            </Item.Content>
        </Item>
    );
}

export default NeighborhoodSearchResultItem;