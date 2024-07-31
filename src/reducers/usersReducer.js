import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_FILTER,
  SET_SORT,
  SET_PAGINAT,
} from '../actions/actionTypes';

// Initial state of the users slice
const initialState = {
  loading: false, // Indicates if the request is in progress
  users: [],      // Array of user objects
  total: 0,       // Total number of users
  error: '',      // Error message (if any)
  filters: {},    // Applied filters
  sort: {},       // Sorting configuration
};

// Reducer function to manage users state
const usersReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true }; // Set loading to true when request starts

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,               // Set loading to false when request completes
        users: action.payload.users,  // Update users array with fetched data
        total: action.payload.total,  // Update total number of users
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,               // Set loading to false on failure
        error: action.payload,        // Set error message
      };

    case SET_FILTER:
      return {
        ...state,
        filters: action.payload,      // Update filters with the provided payload
        users: action.payload,        // Update users array based on the filters
      };

    case SET_SORT:
      return {
        ...state,
        sort: action.payload,         // Update sorting configuration
        users: [],                    // Clear users array (could trigger a refetch based on sort)
      };

    case SET_PAGINAT:
      return {
        ...state,
        users: action.payload,        // Update users array based on pagination
      };

    default:
      return state; // Return the current state for any unknown action types
  }
};

export default usersReducer;
