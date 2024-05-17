import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyCard({ profile, handleDelete }) {
  console.log(profile);
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`/update/profile/${id}`);
  }

  return (
    <>
      <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
        <div className="flex items-center gap-4">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
            className="size-16 rounded-full object-cover"
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
        <div className="flex flex-col justify-items-center">
          <button
            onClick={() => {
              handleEdit(profile.id);
            }}
            className="bg-yellow-500 px-2 py-2 mt-3 rounded-3xl text-gray-100 font-semibold uppercase"
          >
            Update
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          <li>
            <a className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
              <strong className="font-medium text-white">Project A</strong>

              <p className="mt-1 text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                consequuntur deleniti, unde ab ut in!
              </p>
            </a>
          </li>

          <li>
            <a className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
              <strong className="font-medium text-white">Project B</strong>

              <p className="mt-1 text-xs font-medium text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente cumque saepe sit.
              </p>
            </a>
          </li>
        </ul>
      </article>
    </>
  );
}
