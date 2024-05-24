import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfileCard({ profile, handleEdit, handleImage }) {
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`/update/profile/${id}`);
  }

  function handleImage(id) {
    navigate(`/upload/${id}`);
  }

  return (
    <>
      <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src={profile.imageUrl}
            className="size-16 rounded-full object-cover w-[100px] h-[100px]"
          />

          <div>
            <h3 className="text-lg font-medium text-white">{profile.name}</h3>

            <div className="flow-root">
              <ul className="-m-1 flex flex-wrap">
                <li className="p-1 leading-none">
                  <a className="text-xs font-medium text-gray-300">
                    {profile.gender}
                  </a>
                </li>

                <li className="p-1 leading-none">
                  <a className="text-xs font-medium text-gray-300">
                    {profile.phoneNumber}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-items-start gap-5 pt-5">
          <div className="">
            <button
              onClick={() => {
                handleEdit(profile.id);
              }}
              className="bg-yellow-500 px-2 py-2 rounded-3xl text-gray-100 font-semibold uppercase"
            >
              Update
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                handleImage(profile.id);
              }}
              className="bg-yellow-500 px-2 py-2 rounded-3xl text-gray-100 font-semibold uppercase"
            >
              Update Image
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
