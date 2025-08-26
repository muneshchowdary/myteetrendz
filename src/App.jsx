import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductGrid from "./components/ProductGrid";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login"); // 'login' | 'signup' | 'home'

  // Check if user is logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("trendtees_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setPage("home");
    }
  }, []);

  function handleLogin(userObj) {
    setUser(userObj);
    localStorage.setItem("trendtees_user", JSON.stringify(userObj));
    setPage("home");
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("trendtees_user");
    setPage("login");
  }

  function handleSignup(userObj) {
    localStorage.setItem("trendtees_auth", JSON.stringify(userObj));
    handleLogin(userObj);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-grow px-4 py-8 max-w-7xl mx-auto">
        {page === "login" && (
          <Login
            onLogin={handleLogin}
            onGotoSignup={() => setPage("signup")}
          />
        )}
        {page === "signup" && (
          <Signup
            onSignup={handleSignup}
            onGotoLogin={() => setPage("login")}
          />
        )}
        {page === "home" && user && <ProductGrid />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
