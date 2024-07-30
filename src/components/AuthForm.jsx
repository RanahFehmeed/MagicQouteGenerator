import React, { useState } from "react";

const AuthForm = ({ onAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = () => {
    onAuth(username, password, isSignUp);
  };

  return (
    <div className="auth-form">
      <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleAuth}>{isSignUp ? "Sign Up" : "Login"}</button>
      <p>
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <a href="#" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Login" : "Sign Up"}
        </a>
      </p>
    </div>
  );
};

export default AuthForm;
