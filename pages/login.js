// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";
import { login as loginUser } from "@/services/user-service";

export default function Login() {
  const router = useRouter();

  // State for login form fields and error message
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic frontend validation
    if (!userName || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await loginUser({ userName, password });
      // Redirect to home page on successful login
      router.push("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>
          Login
        </button>
      </form>
    </div>
  );
}