import { SIDEBAR_TOGGLE, FILTER_MODAL_SHOW, FILTER_MODAL_HIDE } from '../actions/appActions';

const defaultAppReducerState = {
    sidebarVisible: false,
    filterModalVisible: false
};

const appReducer = (state = defaultAppReducerState, action) => {
    switch (action.type) {
        case SIDEBAR_TOGGLE:
            return {
                ...state,
                sidebarVisible: !state.sidebarVisible
            };

        case FILTER_MODAL_SHOW:
            return {
                ...state,
                filterModalVisible: true
            };
        
        case FILTER_MODAL_HIDE:
            return {
                ...state,
                filterModalVisible: false
            };

        default:
            return state;
    }
};

export default appReducer;