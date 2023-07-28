import Axios from 'axios';
import { useState, useEffect } from 'react';
export default function App() {
  const apiUrl = 'http://localhost:3001';
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    Axios.get(`${apiUrl}/users`)
      .then((res) => setUsers(res.data))
      .catch((error) => console.error(error));
  }, [users]);
  const createUser = () => {
    Axios.post(`${apiUrl}/createUser`, { name, age, email }).then(
      (res) => res.data
    );
  };
  return (
    <>
      {users.map((user) => {
        return (
          <div className="card" key={user._id}>
            <ul>
              <li>{user.name}</li>
              <li>{user.age}</li>
              <li>{user.email}</li>
            </ul>
          </div>
        );
      })}
      <div>
        <input
          type="text"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter your age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>omar</p>
        <p>omar</p>
        <p>omar</p>
        <button onClick={createUser}>Create new user</button>
      </div>
    </>
  );
}
