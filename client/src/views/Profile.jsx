import axios from "axios";
import { useEffect, useState } from "react";
import MyCard from "../components/MyHotelCard";

export default function Profile({ url }) {
  const [profile, setProfile] = useState([]);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${url}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setProfile(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <>
      <div>
        {profile.map((profile) => {
          return <MyCard key={profile.id} profile={profile} />;
        })}
      </div>
    </>
  );
}
