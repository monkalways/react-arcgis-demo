import { TOGGLE_SIDEBAR } from '../actions/appActions';

const defaultAppReducerState = {
    sidebarVisible: false
};

const appReducer = (state = defaultAppReducerState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                sidebarVisible: !state.sidebarVisible
            };
        default:
            return state;
    }
};

export default appReducer;