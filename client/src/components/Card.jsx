import axios from "axios";
import Swal from "sweetalert2";

export default function Card({ hotel }) {
  const url = "http://localhost:3000";

  //   async function handleAdd(id) {
  //     try {
  //       await axios.post(
  //         `${url}/usercoins/${id}`,
  //         {},
  //         { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
  //       );
  //       Swal.fire({
  //         icon: "success",
  //         title: `${hotel.location} Success Added to My hotel`,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       Swal.fire({
  //         icon: "error",
  //         title: error.response.data.message,
  //       });
  //     }
  //   }
  //   console.log(hotel, "<<<<ini hotel card");
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <img src={hotel?.imageUrl} alt="" className="w-[300px] h-[150px]" />
          <h2 className="card-title">{hotel?.name}</h2>
          <h2 className="card-name">{hotel?.location}</h2>
          <h2 className="card-title">{hotel?.price}</h2>
          <h2 className="card-name">{hotel?.address}</h2>
          {/* <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => {
                handleAdd(hotel.id);
              }}
            >
              Add
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}
