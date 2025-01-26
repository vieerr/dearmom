import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import AddContactForm from "./AddContactForm";
import EditContactForm from "./EditContactForm";

const EditContact = ({ people, setPeople }) => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const [editPanelVisibility, setEditPanelVisibility] = useState(false);

  const editContact = (person) => {
    setEditPanelVisibility(true);
    setContact(person);
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
    <>
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
                    onClick={() => {
                      editContact(person);
                    }}
                    className="btn btn-outline mr-2"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this contact?")
                      ) {
                        setPeople(
                          people.filter((person) => person !== people[index])
                        );
                      }
                    }}
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
      {editPanelVisibility ? (
        <EditContactForm
          people={people}
          setPeople={setPeople}
          contact={contact}
          validateContact={validateContact}
          setContact={setContact}
          setEditPanelVisibility={setEditPanelVisibility}
        />
      ) : (
        <AddContactForm people={people} setPeople={setPeople} />
      )}
    </>
  );
};

export default EditContact;
