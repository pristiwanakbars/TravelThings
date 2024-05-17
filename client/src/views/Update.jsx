import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit({ url }) {
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");

  const { id } = useParams();

  async function fetchData() {
    try {
      const { data } = await axios.get(`${url}/profile/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });

      setProfile(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function handleEdit(e, name, gender, phoneNumber) {
    e.preventDefault();
    try {
      const edited = { name, gender, phoneNumber };
      const { data } = await axios.put(`${url}/update/profile/${id}`, edited, {
        headers: { Authorization: `Bearer ${localStorage.access_token}` },
      });
      console.log(data, "<<<<dataaaaa");
      // setProfile(data.updatedProfile);
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
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Update Myprofile
          </h1>
          <form className="space-y-4" onSubmit={handleEdit}>
            <div className="card-body">
              {/* <img src={profile.logo} alt="" className="w-[100px] h-[100px]" />
              <h2 className="card-title">{profile.symbol}</h2> */}
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">name</span>
              </label>

              <input
                type="text"
                placeholder="name"
                className="w-full input input-bordered"
                value={name || ""}
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
