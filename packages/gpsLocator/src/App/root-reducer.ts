import { Reducer } from 'redux';
import combineSectionReducers from 'combine-section-reducers';

import { app } from './reducer';

const rootReducer: Reducer = combineSectionReducers({
  app,
});

export default rootReducer;
