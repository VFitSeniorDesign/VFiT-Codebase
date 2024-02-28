import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./RegisterPage.css";

function RegisterPage() {
  // State to store input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Prepare data to be sent to the API
    const userData = {
      first_name: firstName, // Adjust these keys based on your User model's fields
      last_name: lastName,
      username: username,
      email: email,
      password: password,
    };

    // Send a POST request to the register user API endpoint
    try {
      const response = await fetch('/api/registeruser/', { // Adjust the URL if necessary
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Success:', data);
      // Handle success (e.g., redirecting to login page or showing a success message)
      navigate('/login')
      
    } catch (error) {
      console.error('Error:', error);
      // Handle errors (e.g., showing an error message to the user)
    }
  };

  return (
    <div className="RegisterPage-MainContainer">
      <form className="RegisterPage-FormContainer" onSubmit={handleSubmit}>
        <h2 className="RegisterPage-Title">Register</h2>
        <input type="text" placeholder="First Name" className="RegisterPage-Input" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <input type="text" placeholder="Last Name" className="RegisterPage-Input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <input type="text" placeholder="Username" className="RegisterPage-Input" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" placeholder="Email" className="RegisterPage-Input" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" className="RegisterPage-Input" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" className="RegisterPage-SubmitButton">Submit</button>
      </form>
    </div>
  );
}

export default RegisterPage;
