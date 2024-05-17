import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar sticky top-0 z-10 p-3 bg-base-200 shadow flex justify-between">
        <div className="navbar-start">
          <Link to="/hotels" className="text-4xl font-bold px-6">
            <span className="text-accent">Travel Things</span>
          </Link>
        </div>
        <div className="navbar-end">
          <Link to="/profile" className="text-4xl font-bold px-6">
            Profile
          </Link>
        </div>
        <div className="navbar-end">
          <button
            onClick={handleLogout}
            className="btn btn-ghost px-6 text-red-500"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
