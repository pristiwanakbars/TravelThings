import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function Card({ hotel }) {
  const [result, setResult] = useState("");
  const url = "http://localhost:3000";

  const addData = {
    name: hotel.name,
    location: hotel.location,
    price: hotel.price,
    address: hotel.address,
    imageUrl: hotel.imageUrl,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const { id } = useParams();

  const handleAddMyHotel = async (hotel) => {
    try {
      await axios.post(
        `${url}/myhotels`,
        {
          hotelId: hotel.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      toast.success(`Success add hotel to my hotel`, {
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, { position: "bottom-right" });
    }
  };

  async function review() {
    try {
      console.log(hotel.id, "<<<<idddd");
      const { data } = await axios.post(
        `${url}/aireview/${hotel.id}`,
        addData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      setResult(data);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <img src={hotel?.imageUrl} alt="" className="w-[300px] h-[150px]" />
          <h2 className="card-title h-[100px]">{hotel?.name}</h2>
          <h2 className="card-name">{hotel?.location}</h2>
          <h2 className="card-title">{hotel?.price}</h2>
          <h2 className="card-name h-[100px]">{hotel?.address}</h2>
          <button
            className="btn btn-primary"
            onClick={() => handleAddMyHotel(hotel)}
          >
            Add to My Hotel
          </button>

          <Button onClick={review} className="btn btn-primary text:center">
            Review by AI
          </Button>

          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>
              <div className="divider">
                <h1 className="text-2xl text-black">Hotel Review</h1>
              </div>
            </DialogHeader>
            <DialogBody>
              <p>{result?.resAI}</p>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="gradient"
                color="black"
                onClick={handleOpen}
                className="mr-1"
              >
                <span className="text-red-600">Close</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </div>
    </>
  );
}
