import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setFilter, setSort ,filterUsers, filterId, userPagination } from '../actions/userActions';
import '../styles/UserList.css';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';


const UserList = () => {
  const dispatch = useDispatch();
  // Extracting necessary state values from the Redux store
  const { users, loading, error, sort, filters } = useSelector((state) => state.users);

    // Setting initial pagination and sorting state
    const limit = 10; // Number of users per page
    const [skip, setSkip] = useState(0); // Number of users to skip (for pagination)
    const [order, setOrder] = useState('asc'); // Sorting order
    const [page, setPage] = useState(0); // Current page number

      // Fetch users when component mounts or dependencies change
    useEffect(() => {
    dispatch(fetchUsers(limit, skip, sort, filters));
  }, [dispatch, limit, skip, sort]);

   // Handle filter changes
  const handleFilterChange = (e) => {
    const params = { limit, skip, ...filters, sort };
    dispatch(filterUsers(e.target.name, e.target.value, params))
  
  };

   // Handle sort changes
  const handleSortChange = (sortField) => {
   
    setOrder(prev=> prev === "asc" ? "desc" : "asc")

    dispatch(filterId(  sortField, order ));
  };

    // Handle page changes for pagination
  const handlePageChange = (event, value) => {
    setPage(value);
    setSkip((page-1)*10)
    dispatch(userPagination(limit,skip))
  };
  return (
    <div className='user'>
      <h1>User List</h1>
      {error && <p>{error}</p>}
      <div>
        <label>
          Gender:
          <select name="gender" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          Country:
          <input type="text" name="country" onChange={handleFilterChange} />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSortChange('id')}>ID</th>
            <th onClick={() => handleSortChange('firstName')}>Name</th>
            <th onClick={() => handleSortChange('age')}>Age</th>
            <th>Gender</th>
            <th onClick={() => handleSortChange('country')}>Country</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.address?.country}</td> {/* Adjust according to the actual structure */}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={users.length} page={page} onChange={handlePageChange} />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default UserList;
