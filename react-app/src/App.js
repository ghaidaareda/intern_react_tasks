import './App.css';
import {useState, useEffect} from "react"
import axios from 'axios';

function App() {
  const [users, setUsers] = useState(() => {
    // Retrieve users from localStorage if available
    const savedUsers = localStorage.getItem("users");
    console.log('Retrieved from localStorage:', savedUsers);
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [firstName, setfirstName] = useState("");
  const [lastName, setlasttName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
      console.log('Users saved to localStorage:', users);
    }
  }, [users]);

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = {firstName, lastName, age ,email};
    console.log("New User:", newUser);
    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers, newUser];
      console.log("Updated Users:", updatedUsers);
      return updatedUsers;
    });

    axios.post('http://localhost:5000/add_user', newUser)
      .then(response => {
        console.log('User added successfully:', response.data);
        setUsers(prevUsers => [...prevUsers, newUser]);
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
      
    setfirstName("")
    setlasttName("")
    setAge("")
    setEmail("")
    

  }
  return (
    <div className="form-container" >
      <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>first-name: </p>
        <input type="text"
              value={firstName}
              onChange={(e)=>setfirstName(e.target.value)}></input>
        </div>
        <div className="form-group">
          <p>Last Name:</p>
          <input type="text"
                  value={lastName}
                  onChange={(e)=>setlasttName(e.target.value)}/>
        </div>
        <div className="form-group">
          <p>age:</p>
          <select value={age}
                  onChange={(e)=>setAge(e.target.value)}>
            <option value="">Select Age</option>
            <option value="0-10">0-10</option>
            <option value="10-20">10-20</option>
            <option value="20-30">20-30</option>
            <option value="30-40">30-40</option>
          </select>
        </div>
        <div className="form-group">
          <p>mail:</p>
          <input type="text" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <button onClick={handleSubmit}>submit</button>
      </form>
      {/* <div>
        <h2>Users List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{${user.firstName} ${user.lastName}, Age: ${user.age}, Email: ${user.email}}</li>
          ))}
        </ul>
      </div> */}
      
    </div>
  );
}

export default App;