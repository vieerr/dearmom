import { useState } from "react";
import {
  MdEdit,
  MdElderly,
  MdElderlyWoman,
  MdMan,
  MdWoman,
} from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import AddContactForm from "./AddContactForm";
import EditContactForm from "./EditContactForm";
import { TbManFilled, TbWomanFilled } from "react-icons/tb";

const EditContact = ({ people, setPeople }) => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
  });
  const icons = {
    grandpa: <MdElderly size={35} />,
    grandma: <MdElderlyWoman size={35} />,
    man: <MdMan size={35} />,
    woman: <MdWoman size={35} />,
    "m-kid": <TbManFilled size={35} />,
    "f-kid": <TbWomanFilled size={35} />,
  };

  const [editPanelVisibility, setEditPanelVisibility] = useState(false);

  const editContact = (person) => {
    setEditPanelVisibility(true);
    setContact(person);
  };

  const validateContact = (person) => {
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(person.name)) {
      alert("Name should contain only letters.");
      return false;
    }

    // TODO: Validate name uniqueness;
    // if (
    //   person.name !== "mom" &&
    //   person.name !== "dad" &&
    //   people.some((prs) => prs.name === person.name)
    // ) {
    //   alert("Contact with that name already exists");
    //   return false;
    // }

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
            people.toReversed().map((person, index) => (
              <li
                key={index}
                style={{ backgroundColor: person.color }}
                className="capitalize flex p-2 shadow-md text-white border-2 border-gray-300 rounded-md justify-between items-center"
              >
                <div className="avatar">
                  <div className="border-2 p-2 rounded-full">
                    {icons[person.icon]}
                  </div>
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
                            "Are you sure you want to delete this contact?",
                          )
                        ) {
                          setPeople(
                            people.filter((person) => person !== people[index]),
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
