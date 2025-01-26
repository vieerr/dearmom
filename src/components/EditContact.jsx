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

  const validateContact = (person) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{9}$/;

    if (!nameRegex.test(person.name)) {
      alert("Name should contain only letters.");
      return false;
    }

    if (!phoneRegex.test(person.phone)) {
      alert("Phone number should contain exactly 9 digits.");
      return false;
    }

    if (!person.icon) {
      alert("Please select an icon.");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="border-2 border-gray-400 rounded-md p-5">
        <ul className="space-y-2 max-h-48 p-2 overflow-scroll ">
          {people.length === 0 ? (
            <p className="text-center font-light">No contacts registered</p>
          ) : (
            people.map((person, index) => (
              <li
                key={index}
                style={{ backgroundColor: person.color }}
                className="capitalize flex p-2 shadow-md text-white border-2 border-gray-300 rounded-md justify-between items-center"
              >
                <div className="avatar">
                  <div className="border-2 p-2 rounded-full">{person.icon}</div>
                </div>
                <p>{person.name}</p>
                <div className="flex">
                  <button
                    type="button"
                    onClick={() => {
                      editContact(person);
                    }}
                    className="btn btn-square border-white mr-2"
                  >
                    <MdEdit />
                  </button>
                  {!(person.name === "dad" || person.name === "mom") && (
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you sure you want to delete this contact?"
                          )
                        ) {
                          setPeople(
                            people.filter((person) => person !== people[index])
                          );
                        }
                      }}
                      className="btn btn-square border-white mr-2"
                    >
                      <FaTrash />
                    </button>
                  )}
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
        <AddContactForm
          validateContact={validateContact}
          people={people}
          setPeople={setPeople}
        />
      )}
    </>
  );
};

export default EditContact;
