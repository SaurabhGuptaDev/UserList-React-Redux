import axios from 'axios';
import { SET_PAGINAT, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, SET_FILTER, SET_SORT } from './actionTypes';

// Action creators

// Action for fetching users request (used for setting loading state)
const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

// Action for successfully fetched users
const fetchUsersSuccess = (users, total) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users, total },
});

// Action for failed user fetch attempt
const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// Thunk action for fetching users with filters, sorting, and pagination
export const fetchUsers = (limit, skip, filters, sort) => async (dispatch) => {
  dispatch(fetchUsersRequest()); // Start loading state
  try {
    const params = { limit, skip, ...filters, sort }; // API request parameters
    const response = await axios.get('https://dummyjson.com/users', { params });
    dispatch(fetchUsersSuccess(response.data.users, response.data.total)); // Success
  } catch (error) {
    dispatch(fetchUsersFailure(error.message)); // Handle errors
  }
};

// Action to set filters
export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

// Action to set sorting order
export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
});

// Thunk action for filtering users by a specific key and value
export const filterUsers = (key, value) => async (dispatch) => {
  dispatch(fetchUsersRequest()); // Start loading state
  try {
    const response = await axios.get(`https://dummyjson.com/users/filter?key=${key}&value=${value}`);
    dispatch({ type: SET_FILTER, payload: response.data.users }); // Filtered users

    // If filter value is empty, fetch all users again
    if (!value) {
      const allUsersResponse = await axios.get('https://dummyjson.com/users');
      dispatch(fetchUsersSuccess(allUsersResponse.data.users, allUsersResponse.data.total));
    }
  } catch (error) {
    dispatch(fetchUsersFailure(error.message)); // Handle errors
  }
};

// Thunk action for sorting users by a specific field
export const filterId = (key, value) => async (dispatch) => {
  try {
    const response = await axios.get(`https://dummyjson.com/users?sortBy=${key}&order=${value}`);
    dispatch({ type: SET_FILTER, payload: response.data.users }); // Sorted users
  } catch (error) {
    dispatch(fetchUsersFailure(error.message)); // Handle errors
  }
};

// Thunk action for handling pagination
export const userPagination = (skip) => async (dispatch) => {
  try {
    const response = await axios.get(`https://dummyjson.com/users?limit=10&skip=${skip}&select=firstName,age,gender,country`);
    dispatch({ type: SET_PAGINAT, payload: response.data.users }); // Paginated users
  } catch (error) {
    dispatch(fetchUsersFailure(error.message)); // Handle errors
  }
};
