import { createSelector } from 'reselect';

const mapSelector = state => state.map;

export const visibleLayersSelector = createSelector(
    mapSelector,
    map => {
        console.log(map.layers);
        return map.layers.filter(layer => layer.visible)
    }
);