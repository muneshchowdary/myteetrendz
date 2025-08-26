export default function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="TrendTees" className="h-8 w-8 mr-2" />
          <span className="font-bold text-xl tracking-tight">TrendTees</span>
        </div>
        <nav className="space-x-6">
          <a href="#" className="text-gray-700 hover:text-black">Home</a>
          <a href="#" className="text-gray-700 hover:text-black">Shop</a>
          <a href="#" className="text-gray-700 hover:text-black">About</a>
          <a href="#" className="text-gray-700 hover:text-black">Contact</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Cart</button>
          {user ? (
            <>
              <span className="text-gray-900 font-medium">{user.username}</span>
              <button
                onClick={onLogout}
                className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
