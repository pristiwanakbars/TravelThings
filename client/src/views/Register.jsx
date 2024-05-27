import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Register({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const registered = { email, password };
      const { data } = await axios.post(`${url}/register`, registered);
      Swal.fire({
        icon: "success",
        title: `${data.message}`,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-indigo-700">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Register
          </h1>
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email Address"
                className="w-full input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to="/login">
              <p className="text-xs text-gray-600 hover:underline hover:text-blue-600">
                Do you have an account? Login
              </p>
            </Link>

            <div>
              <button className="btn btn-block" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
