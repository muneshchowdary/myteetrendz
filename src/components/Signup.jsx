import { useState } from "react";

export default function Signup({ onSignup, onGotoLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      setErr("Username and password are required.");
      return;
    }
    // Simple username uniqueness check
    const auth = JSON.parse(localStorage.getItem("trendtees_auth") || "{}");
    if (auth.username === username) {
      setErr("Username already exists.");
      return;
    }
    onSignup({ username, password });
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-8 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {err && <div className="text-red-500">{err}</div>}
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={onGotoLogin} className="text-blue-600 hover:underline">
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
