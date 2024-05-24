import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Profile from "../components/Profile";

export default function Edit({ url }) {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const { data } = await axios.get(`${url}/profile/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      console.log(data);

      setName(data.name);
      setGender(data.gender);
      setPhoneNumber(data.phoneNumber);
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "bottom-right",
      });

      if (error.response.data.statusCode === 500) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleEdit(e) {
    e.preventDefault();
    try {
      const edited = { name, gender, phoneNumber };
      console.log(edited);
      const { data } = await axios.put(`${url}/update/profile/${id}`, edited, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "bottom-right",
      });
    }
  }
  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Update Myprofile
          </h1>
          <form className="space-y-4" onSubmit={handleEdit}>
            <div className="card-body"></div>

            <div>
              <label className="label">
                <span className="text-base label-text">name</span>
              </label>

              <input
                type="text"
                placeholder="name"
                className="w-full input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">phoneNumber</span>
              </label>
              <input
                type="text"
                placeholder="phoneNumber"
                className="w-full input input-bordered"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">gender</span>
              </label>
              <input
                type="text"
                placeholder="gender"
                className="w-full input input-bordered"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>

            <div>
              <button className="btn btn-block" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
