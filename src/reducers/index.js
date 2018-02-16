import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import mapReducer from './mapReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
    app: appReducer,
    map: mapReducer,
    form: formReducer
});

export default rootReducer;