import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../config';

const AddData = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await axios.post(`${SERVER_URL}/api/data`, { name, email, phone });
    onAdd(result.data);
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="add-data-container">
      <h2>Add Data</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddData;
