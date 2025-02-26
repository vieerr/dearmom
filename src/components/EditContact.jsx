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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import getBackendURL from "../utils/getBackendURL";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const EditContact = ({ people, setPeople }) => {
  const [editPanelVisibility, setEditPanelVisibility] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
  });

  const { user } = useContext(AuthContext);

  const deleteContactFn = async (id) => {
    try {
      const { data } = await axios.delete(getBackendURL() + "/delete-contact", {
        data: {
          userId: user.userId,
          contactId: id,
        },
      });
      return data;
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Hubo un error en el servidor al eliminar el contacto.");
    }
  };

  const { mutate: deleteContact } = useMutation({
    mutationKey: ["deleteContact", user?.userId],
    mutationFn: deleteContactFn,
    onSuccess: async (data) => {
      alert("Contacto eliminado con éxito");
      setPeople(data);
    },
    onError: (error) => {
      console.error("Error deleting contact:", error);
      alert("Hubo un error en el servidor al eliminar el contacto.");
    },
  });
  const icons = {
    grandpa: <MdElderly size={35} />,
    grandma: <MdElderlyWoman size={35} />,
    man: <MdMan size={35} />,
    woman: <MdWoman size={35} />,
    "m-kid": <TbManFilled size={35} />,
    "f-kid": <TbWomanFilled size={35} />,
  };

  const editContact = (person) => {
    setEditPanelVisibility(true);
    setContact(person);
  };

  const validateContact = (person, type) => {
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(person.name)) {
      alert("Name should contain only letters.");
      return false;
    }

    // TODO: Validate name uniqueness;
    if (type === "edit") {
      if (people.some((prs) => prs.name === person.name)) {
        alert("Contact with that name already exists");
        return false;
      }
    }

    if(type === "add") {
      if (person.name === "dad" || person.name === "mom") {
        alert("Contact can't be named dad or mom");
        return false;
      }
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
                            "Are you sure you want to delete this contact?"
                          )
                        ) {
                          deleteContact(person.id);
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
