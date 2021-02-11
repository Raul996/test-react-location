import { combineReducers, createStore } from 'redux';
import { categoryReducer } from './reducer/categoryReducer';
import { locationReducer } from './reducer/locationReducer';

export const store = createStore(
    combineReducers({ category: categoryReducer, location: locationReducer })
);
