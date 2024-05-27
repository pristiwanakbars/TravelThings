import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ImageForm = ({ url, id }) => {
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageUrl", fileRef.current.files[0]);

    try {
      await axios.patch(`${url}/upload/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      toast.success("Successfully update profile image", {
        position: "bottom-right",
      });
      navigate("/profile");
    } catch (error) {
      toast.error(error.response.data.error, { position: "bottom-right" });

      if (error.response.data.statusCode === 500) {
        localStorage.removeItem("access_token");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            Update Myprofile
          </h1>
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            <div className="card-body">
              {/* <img src={profile.logo} alt="" className="w-[100px] h-[100px]" />
            <h2 className="card-title">{profile.symbol}</h2> */}
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">photo</span>
              </label>
              <input
                type="file"
                ref={fileRef}
                placeholder="photo"
                className="w-full input input-bordered"
                autoComplete="off"
                required
                // onChange={(e) => setImageUrl(e.target.value)}
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
};

export default ImageForm;
