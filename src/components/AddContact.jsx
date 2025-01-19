import { useState } from "react";
import { FaD } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

//icons for the contacts
import { MdElderly, MdElderlyWoman, MdMan, MdWoman } from "react-icons/md";
import { TbManFilled, TbWomanFilled } from "react-icons/tb";

const AddContact = ({ people, setPeople }) => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const editContact = (person) => {
    setContact(person);
    // setPeople(people.filter((p) => p !== person));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Contact added:", contact);
    setPeople([...people, contact]);
  };

  const validateContact = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{9}$/;

    if (!nameRegex.test(contact.name)) {
      alert("Name should contain only letters.");
      return false;
    }

    if (!phoneRegex.test(contact.phone)) {
      alert("Phone number should contain exactly 9 digits.");
      return false;
    }

    if (!contact.icon) {
      alert("Please select an icon.");
      return false;
    }

    return true;
  };

  return (
    <form
      className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center uppercase ">
        registered contacts
      </h2>

      <div className="border-2 border-gray-400 rounded-md p-5">
        <ul className="space-y-2 max-h-48 p-2 overflow-scroll ">
          {people.length === 0 ? (
            <p className="text-center font-light">No contacts registered</p>
          ) : (
            people.map((person, index) => (
              <li
                key={index}
                className="flex p-2 shadow-md border-2 border-gray-300 rounded-md justify-between items-center"
              >
                <div className="avatar">
                  <div className="border-2 p-2 rounded-full">{person.icon}</div>
                </div>{" "}
                <p>{person.name}</p>
                <div className="flex">
                  <button
                    type="button"
                    onClick={(e) => {
                      editContact(person);
                    }}
                    className="btn btn-outline mr-2"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() =>
                      setPeople(
                        people.filter((person) => person !== people[index])
                      )
                    }
                    className="btn btn-outline  "
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      <h2 className="capitalize font-bold pt-5 pb-3">add new contact</h2>

      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-bold ">Select Icon</span>
        </label>
        <div className="grid grid-cols-3 gap-4 ">
          <button
            type="button"
            onClick={() =>
              setContact({ ...contact, icon: <MdElderly size={25} /> })
            }
            className={`btn btn-outline ${
              contact.icon?.type === MdElderly ? "btn-primary" : ""
            }`}
          >
            <MdElderly size={35} />
          </button>
          <button
            type="button"
            onClick={() =>
              setContact({ ...contact, icon: <MdElderlyWoman size={25} /> })
            }
            className={`btn btn-outline   ${
              contact.icon?.type === MdElderlyWoman ? "btn-primary" : ""
            }`}
          >
            <MdElderlyWoman size={35} />
          </button>
          <button
            type="button"
            onClick={() =>
              setContact({ ...contact, icon: <MdMan size={25} /> })
            }
            className={`btn btn-outline   ${
              contact.icon?.type === MdMan ? "btn-primary" : ""
            }`}
          >
            <MdMan size={35} />
          </button>
          <button
            type="button"
            onClick={() =>
              setContact({ ...contact, icon: <MdWoman size={25} /> })
            }
            className={`btn btn-outline   ${
              contact.icon?.type === MdWoman ? "btn-primary" : ""
            }`}
          >
            <MdWoman size={35} />
          </button>
          <button
            type="button"
            onClick={() =>
              setContact({ ...contact, icon: <TbManFilled size={25} /> })
            }
            className={`btn btn-outline   ${
              contact.icon?.type === TbManFilled ? "btn-primary" : ""
            }`}
          >
            <TbManFilled size={35} />
          </button>
          <button
            type="button"
            onClick={() =>
              setContact({ ...contact, icon: <TbWomanFilled size={25} /> })
            }
            className={`btn btn-outline   ${
              contact.icon?.type === TbWomanFilled ? "btn-primary" : ""
            }`}
          >
            <TbWomanFilled size={35} />
          </button>
        </div>
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          placeholder="Enter name"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Phone Number</span>
        </label>
        <div className="flex items-center">
          <label className=" input input-bordered flex items-center gap-2">
            <span className="font-bold">+593</span>
            <input
              type="tel"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              placeholder="987654321"
              className="grow"
              required
            />
          </label>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (validateContact()) {
            const existingContactIndex = people.findIndex(
              (person) => person.phone === contact.phone
            );
            if (existingContactIndex !== -1) {
              const updatedPeople = [...people];
              updatedPeople[existingContactIndex] = contact;
              setPeople(updatedPeople);
            } else {
              setPeople([...people, contact]);
            }
            setContact({ name: "", phone: "" });
          }
        }}
        type="submit"
        className="btn btn-primary w-full"
      >
        Add Contact
      </button>
    </form>
  );
};

export default AddContact;
