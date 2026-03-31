import { useState } from "react";
import { useRouter } from "next/router";
import { register as registerUser } from "@/services/user-service";

export default function Register() {
  const router = useRouter();

  // form state
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [error, setError] = useState("");

  // form submit handler
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // clear previous error

  // frontend password confirmation check
  if (password !== password2) {
    setError("Passwords do not match");
    return;
  }

  try {
    // call backend register API
    // pass both password and password2 to match backend check
    await registerUser({ userName, password, password2 });
    // redirect to login page after successful registration
    router.push("/login");
  } catch (err) {
    // display error message from backend
    setError(err.message || "Registration failed");
  }
};

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setpassword2(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "20px" }}>
          Register
        </button>
      </form>
    </div>
  );
}