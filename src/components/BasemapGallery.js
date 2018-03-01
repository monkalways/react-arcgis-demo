import React from 'react';
import { connect } from 'react-redux';
import { Card, Divider, Header, Image } from 'semantic-ui-react';

import { basemaps } from '../constants';
import { changeBasemap } from '../actions/mapActions';

const BasemapGallery = ({currentBasemap, changeBasemap}) => {

    const getCardColor = (basemap) => basemap.title === currentBasemap ? 'violet' : '';

    return (
        <div>
            <Header>Basemap Gallery</Header>
            <Divider />
            <Card.Group itemsPerRow={3}>
                {basemaps.map(basemap => (
                    <Card key={basemap.id} color={getCardColor(basemap)} onClick={() => changeBasemap(basemap.id)}>
                        <Image src={basemap.imageUrl} />
                        <Card.Content>
                            {basemap.title === currentBasemap ? (
                                <Card.Header textAlign="center">{basemap.title}</Card.Header>
                            ) : (
                                <Card.Description textAlign="center">{basemap.title}</Card.Description>
                            )}
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentBasemap: state.map.basemap
});

export default connect(mapStateToProps, {changeBasemap})(BasemapGallery);