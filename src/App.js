import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from './components/UserSlice';
import { Provider } from 'react-redux';
import store from './components/Store';
import './App.css';

function UserList() {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.users);

  const [newUser, setNewUser] = useState({ name: '', email: '' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      dispatch(addUser(newUser));
      setNewUser({ name: '', email: '' });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <table className="table-container">
        <caption>User List</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-user-container">
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UserList />
      </div>
    </Provider>
  );
}

export default App;
