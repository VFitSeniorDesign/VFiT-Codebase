import React, { Component } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import AuthContext from '../components/AuthContext';

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(../../public/background3.jpeg) no-repeat center center fixed;
  background-size: cover;
`;

const FormContainer = styled.form`
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  /* Add more styling based on your previous CSS */
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
`;

const Icon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;

  label {
    color: #333; // Adjust color as needed
    font-size: 0.9rem;
  }

  a {
    color: #0066cc; // Adjust link color as needed
    font-size: 0.9rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginButton = styled.button`
  background-color: #007bff; // Primary button color
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; // Darken button on hover
  }
`;

const RegisterLink = styled.div`
  margin-top: 15px;
  p {
    font-size: 0.9rem;
    color: #333; // Adjust paragraph color as needed

    a {
      color: #0066cc; // Adjust link color as needed
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

// Similar styled components for RememberForgot, Button, and RegisterLink

class LoginPage extends Component {
  static contextType = AuthContext;

  render() {
    const { loginUser } = this.context;

    return (
      <LoginPageContainer>
        <FormContainer onSubmit={loginUser}>
          <h1>Welcome</h1>
          <InputBox>
            <Input type="text" placeholder="Username" name="username" required />
            <Icon><FaUser /></Icon>
          </InputBox>
          <InputBox>
            <Input type="password" placeholder="Password" name="password" required />
            <Icon><FaLock /></Icon>
          </InputBox>
          <RememberForgot>
            <label><input type="checkbox" />Remember me</label>
            <a href="/forgot"> Forgot Password </a>
          </RememberForgot>
          <button type="submit">Login</button>
          <RegisterLink>
            <p>Don't have an account? <a href="/register">Register</a></p>
          </RegisterLink>
        </FormContainer>
      </LoginPageContainer>
    );
  }
}

export default LoginPage;
