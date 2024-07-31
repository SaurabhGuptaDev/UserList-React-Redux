import { createStore, applyMiddleware, combineReducers } from 'redux';
// Use named import for thunk middleware
import { thunk } from 'redux-thunk';
import usersReducer from './reducers/usersReducer';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  users: usersReducer, // Users state managed by usersReducer
});

// Create a Redux store with the root reducer and middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
