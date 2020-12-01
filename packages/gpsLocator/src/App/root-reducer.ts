import { Reducer } from 'redux';
import combineSectionReducers from 'combine-section-reducers';
import { geo } from '../services/geo/reducer';
import { app } from './reducer';

const rootReducer: Reducer = combineSectionReducers({
  app,
  geo,
});

export default rootReducer;
