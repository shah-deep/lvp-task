import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditData from './EditData';
import DeleteData from './DeleteData';
import { SERVER_URL } from '../config';

function Data() {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    refreshData();
  }, []);

  function editUser(user) {
    setSelectedUser(user);
  }

  function cancelEdit() {
    setSelectedUser(null);
  }

  function saveUser(user) {
    axios.put(`${SERVER_URL}api/data/${user.id}`, user)
      .then(res => {
        console.log(res.data);
        setSelectedUser(null);
        refreshData();
      })
      .catch(err => console.log(err));
  }


  function refreshData() {
    axios.get(`${SERVER_URL}/api/data`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => editUser(user)}>Edit</button>
                <DeleteData user={user} onDelete={() => refreshData()} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && <EditData key={selectedUser.id} user={selectedUser} onSave={saveUser} onCancel={cancelEdit} />}
    </div>
  );
}

export default Data;
