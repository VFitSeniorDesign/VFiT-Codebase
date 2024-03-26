import React, { useState, useEffect } from 'react';

function MainContent() {
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const calculateNavbarHeight = () => {
      const navbar = document.querySelector('.navbar'); // Adjust the selector as needed
      setNavbarHeight(navbar.offsetHeight);
    };

    calculateNavbarHeight();
    window.addEventListener('resize', calculateNavbarHeight);

    return () => window.removeEventListener('resize', calculateNavbarHeight);
  }, []);

  return (
    <div style={{ paddingTop: `${navbarHeight}px` }}>
      {/* Your main content goes here */}
    </div>
  );
}


<MainContainer navbarHeight={navbarHeight}>
        <FormContainer onSubmit={loginUser}>
          <h1>Welcome</h1>
          <InputBox>
            <input type="text" placeholder="Username" name="username" required />
            <FaUser className="LoginPage-Icon" />
          </InputBox>
          <InputBox>
            <input type="password" placeholder="Password" name="password" required />
            <FaLock className="LoginPage-Icon" />
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
      </MainContainer>