// src/pages/login/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const creds: Record<string, { username: string; password: string }> = {
      Admin: { username: "admin", password: "admin123" },
      Doctor: { username: "meera", password: "doctor123" }, // Meera Nair
    };

    if (!role || !creds[role]) {
      alert("Please select a role.");
      return;
    }

    const valid =
      creds[role].username === username && creds[role].password === password;
    if (!valid) {
      alert("Invalid credentials!");
      return;
    }

    // Save role & name in localStorage
    const userData = {
      role,
      name: role === "Doctor" ? "Dr. Meera Nair" : "Admin",
    };
    localStorage.setItem("user", JSON.stringify(userData));

    // Redirect based on role
    if (role === "Admin") navigate("/", { replace: true });
    else if (role === "Doctor") navigate("/book-slot", { replace: true });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Login As</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
