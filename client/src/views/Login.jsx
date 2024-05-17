import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage({ url }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const addedData = { email, password };

      const { data } = await axios.post(`${url}/login`, addedData);
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token:" + response.credential);
    const googleToken = response.credential;
    // console.log(googleToken, "<<<tokengoogleee");

    try {
      const { data } = await axios.post(`${url}/login/google`, {
        googleToken,
      });

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "13241614038-fa5m4d57u28jo332lf99kc2i989lou09.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-gray-200">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handleLogin}>
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
            <Link to="/register">
              <p className="text-xs text-gray-600 hover:underline hover:text-blue-600">
                Don't have an account yet? Register
              </p>
            </Link>

            <div>
              <button className="btn btn-block">Login</button>
            </div>
          </form>
          <br />
          <div className="text-center divider px-10">OR</div>
          <br />
          <div id="buttonDiv" className="w-full flex justify-center"></div>
        </div>
      </div>
    </>
  );
}
