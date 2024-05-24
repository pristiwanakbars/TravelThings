import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyHotelCard({ myHotel, handleDelete }) {
  console.log(myHotel);
  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <img
            src={myHotel.Hotel.imageUrl}
            alt=""
            className="w-[300px] h-[150px]"
          />
          <h2 className="card-title h-[100px]">{myHotel.Hotel.name}</h2>
          <h2 className="card-name">{myHotel.Hotel.location}</h2>
          <h2 className="card-title">{myHotel.Hotel.price}</h2>
          <h2 className="card-name h-[100px]">{myHotel.Hotel.address}</h2>
          <button
            className="btn btn-primary"
            onClick={() => handleDelete(myHotel.id)}
          >
            Delete from MyHotel
          </button>
        </div>
      </div>
    </>
  );
}
