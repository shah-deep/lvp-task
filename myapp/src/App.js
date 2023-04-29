import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlinePlayCircle, AiOutlinePlus } from 'react-icons/ai';
import Data from './components/Data';
import AddData from './components/AddData';
import EditData from './components/EditData';
import './App.css';
import './style.css';



const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios('http://localhost:5000/api/data');
    setData(result.data);
  };

  const handleAdd = newData => {
    setData([...data, newData]);
  };

  const handleUpdate = updatedData => {
    const updatedList = data.map(item => (item.id === updatedData.id ? updatedData : item));
    setData(updatedList);
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/data/${id}`);
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <Router>
        <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <NavLink exact to="/" activeClassName="active"  title="Home">
                <AiOutlineHome />
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-data" activeClassName="active" title="Add Data">
                <AiOutlinePlus />
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <Data data={data} onDelete={handleDelete} />
          </Route>
          <Route path="/add-data">
            <AddData onAdd={handleAdd} />
          </Route>
          <Route path="/edit-data/:id/:name">
            <EditData onUpdate={handleUpdate} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


