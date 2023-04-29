import React, { useState } from 'react';
import axios from 'axios';

function EditData(props) {
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [phone, setPhone] = useState(props.user.phone);
  
    function handleNameChange(e) {
      setName(e.target.value);
    }
  
    function handleEmailChange(e) {
      setEmail(e.target.value);
    }
  
    function handlePhoneChange(e) {
      setPhone(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      const updatedUser = { id: props.user.id, name, email, phone };
      props.onSave(updatedUser);
    }
  
    function handleCancel() {
      props.onCancel();
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <label>
            Phone:
            <input type="text" value={phone} onChange={handlePhoneChange} />
          </label>
          <br />
          <button type="submit">Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    );
  }
  
  export default EditData;
  