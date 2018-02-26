import React from 'react';
import { Item } from 'semantic-ui-react';

const SchoolSearchResultItem = ({NAME: name}) => {
    return (
        <Item>
            <Item.Content verticalAlign='middle'>
                <Item.Description as='a'>{name}</Item.Description>
            </Item.Content>
        </Item>
    );
}

export default SchoolSearchResultItem;