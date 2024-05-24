import axios from "axios";
import React, { useEffect, useState } from "react";
import MyHotelCard from "../components/MyHotelCard";
import { toast } from "react-toastify";

export default function MyHotel({ url }) {
  const [myHotel, setMyHotel] = useState([]);

  const fetchMyHotel = async () => {
    try {
      const { data } = await axios.get(`${url}/myhotels`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setMyHotel(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleDelete(id) {
    try {
      await axios.delete(`${url}/myhotels/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      toast.success(`Success delete your hotel list`, {
        position: "bottom-right",
      });

      fetchMyHotel();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMyHotel();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 p-4 gap-3">
      {myHotel.map((myHotel) => {
        return (
          <MyHotelCard
            key={myHotel.id}
            myHotel={myHotel}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}
