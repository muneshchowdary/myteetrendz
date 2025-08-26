import { useState } from "react";

export default function Login({ onLogin, onGotoSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const auth = JSON.parse(localStorage.getItem("trendtees_auth") || "{}");
    if (auth.username === username && auth.password === password) {
      onLogin({ username });
    } else {
      setErr("Invalid username or password.");
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-8 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <button onClick={onGotoSignup} className="text-blue-600 hover:underline">
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
}
