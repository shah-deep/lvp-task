import React from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';

function DeleteData(props) {
  function handleDelete() {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`${SERVER_URL}/api/delete/${props.user.id}`)
        .then(res => {
          console.log(res.data);
          props.onDelete();
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteData;
