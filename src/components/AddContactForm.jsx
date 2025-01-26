import { useState } from "react";
//icons for the contacts
import { MdElderly, MdElderlyWoman, MdMan, MdWoman } from "react-icons/md";
import { TbManFilled, TbWomanFilled } from "react-icons/tb";

const AddContactForm = ({ people, setPeople }) => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
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
    <form className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
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
              if (
                window.confirm(
                  "Contact with this phone number already exists. Do you want to update it?"
                )
              ) {
                setPeople([...people, contact]);
              }
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

export default AddContactForm;
