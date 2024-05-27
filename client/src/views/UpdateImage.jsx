import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ImageForm from "../components/ImageForm";

export default function UpdateImage({ url }) {
  const [profile, setProfile] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.patch(
          `${url}/upload/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setProfile(data);
        toast.success("Successfully update image", {
          position: "bottom-right",
        });
      } catch (error) {
        console.log(error);

        if (error.response.data.statusCode === 500) {
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [id, navigate]);

  useEffect(() => {
    document.title = `Update Profile Image ${
      profile?.id || ""
    } | Travel Things`;
  }, [profile?.id]);

  return (
    <>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div className="">
          <h1 className="text-3xl font-semibold text-center text-gray-700">
            <ImageForm id={id} url={url} />
          </h1>
        </div>
      </div>
    </>
  );
}
