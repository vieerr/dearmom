import { TbManFilled } from "react-icons/tb";

const Contacts = ({ people, sendLetter, letterRef }) => {
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">Other contacts</h3>
      <div className="flex flex-col gap-5 p-7">
        {people.map((person) => (
          <button
            key={person.name}
            onClick={() => sendLetter(letterRef, "593" + person.phone)}
            className="btn"
          >
            <TbManFilled size={35} className="inline-block" /> {person.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
