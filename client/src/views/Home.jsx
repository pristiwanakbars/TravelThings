import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "../features/hotels/hotels-slicer";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "../components/Card";
import gearLoad from "./assets/Gear-0.2s-264px.svg";

export default function HomePage() {
  const { hotels, loading } = useSelector((state) => state.hotels);

  const dispatch = useDispatch();
  const url = "http://localhost:3000";

  //   async function fetchData() {
  //     try {
  //       setLoading(true);
  //       const { data } = await axios.get(`${url}/hotels`, {
  //         headers: { Authorization: `Bearer ${localStorage.access_token}` },
  //       });
  //       setHotels(data.hotel);
  //     } catch (error) {
  //       console.log(error);
  //       Swal.fire({
  //         icon: "error",
  //         title: error.response.data.message,
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);
  return (
    <>
      <div className="divider px-10"></div>
      {loading ? (
        <div className="mt-32 flex justify-center items-center">
          <img src={gearLoad} />
        </div>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-4 gap-3">
          {hotels.map((hotel) => {
            return <Card key={hotel.id} hotel={hotel} />;
          })}
        </main>
      )}
    </>
  );
}

{
  /* <div className="grid grid-cols-5 p-4 gap-3"></div>; */
}
