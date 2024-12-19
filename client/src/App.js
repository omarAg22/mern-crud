import Axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css'; // Importez votre fichier CSS ici

export default function App() {
  const apiUrl = 'http://localhost:3001';
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  // const [email, setEmail] = useState('');

  useEffect(() => {
    Axios.get(`${apiUrl}/users`)
      .then((res) => setUsers(res.data))
      .catch((error) => console.error(error));
  }, []); // Utilisez une dépendance vide pour charger les utilisateurs une seule fois

  const createUser = () => {
    Axios.post(`${apiUrl}/createUser`, { name, age, email }).then(
      (res) => {
        setUsers([...users, res.data]); // Ajoutez le nouvel utilisateur à la liste
        setName('');
        setAge('');
        setEmail('');
      }
    );
  };

  return (
    <div className="app">
      <h1>User Management System</h1>
      <div className="user-form">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={createUser}>Create new user</button>
      </div>
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user._id}>
            <ul>
              <li>Name: {user.name}</li>
              <li>Age: {user.age}</li>
              <li>Email: {user.email}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
