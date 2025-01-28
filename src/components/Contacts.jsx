import axios from "axios";
import { useState } from "react";
import getBackendURL from "../utils/getBackendURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Contacts = ({ setAudio, setAddressee, people }) => {
  const [selectedContact, setSelectedContact] = useState(null);
  let text = "";

  const fetchAudio = async () => {
    const { data } = await axios.post(
      getBackendURL() + "/synthesize",
      { text },
      { responseType: "blob" }
    );
    return data;
  };

  const { data, refetch } = useQuery({
    queryKey: ["audio"],
    queryFn: fetchAudio,
    staleTime: Infinity,
    enabled: false,
  });

  const handleAudio = async (person) => {
    if (person) {
      setSelectedContact(person);
      setAddressee(person);
      text = "Se enviará la carta a " + person.name;
      await refetch();
    }
  };

  useEffect(() => {
    if (data) {
      setAudio(URL.createObjectURL(data));
    }
  }, [data]);

  return (
    <div className="modal-box">
      <form method="dialog">
        <button className="btn btn-lg btn-circle text-3xl font-bold btn-ghost absolute right-2 top-2">
          ✕
        </button>{" "}
      </form>
      <h3 className="font-bold text-lg">Other contacts</h3>
      <div className="flex flex-col gap-5 p-7">
        {people.map((person, index) => (
          <button
            key={index}
            onClick={() => {
              handleAudio(person);
            }}
            style={
              selectedContact?.name === person.name
                ? { backgroundColor: "green" }
                : { backgroundColor: person.color }
            }
            className="btn btn-lg text-white justify-evenly"
          >
            <div className="avatar">
              <div className="border-2 p-2 rounded-full">{person.icon}</div>
            </div>
            <p className="text-xl">{person.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
