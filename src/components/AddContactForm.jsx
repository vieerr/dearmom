import { useState } from "react";
//icons for the contacts
import { MdElderly, MdElderlyWoman, MdMan, MdWoman } from "react-icons/md";
import { TbManFilled, TbWomanFilled } from "react-icons/tb";
import { BlockPicker } from "react-color";
import ColorPicker from "./ColorPicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import getBackendURL from "../utils/getBackendURL";

// people, setPeople used to be a prop
const AddContactForm = ({ validateContact, setPeople }) => {
  const { user, authToken } = useContext(AuthContext);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    color: "#fff",
  });

  const icons = [
    { name: "grandpa", component: <MdElderly size={35} /> },
    { name: "grandma", component: <MdElderlyWoman size={35} /> },
    { name: "man", component: <MdMan size={35} /> },
    { name: "woman", component: <MdWoman size={35} /> },
    { name: "m-kid", component: <TbManFilled size={35} /> },
    { name: "f-kid", component: <TbWomanFilled size={35} /> },
  ];

  useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await fetch(`${getBackendURL()}/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) throw new Error("Error al obtener los contactos");
      console.log({ response });
      return response.json();
    },
    onSuccess: (data) => {
      console.log({ data });
      setPeople(data.contacts);
    },
    onError: (error) => {
      console.error("Error obteniendo los contactos", error);
    },
  });

  const { mutate } = useMutation({
    mutationKey: "contacts",
    mutationFn: async (data) => {
      const response = await fetch(`${getBackendURL()}/add-contact`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al registrar el contacto");
      return response.json();
    },
    onSuccess: (data) => {
      setPeople(data.contacts);
      console.log("Contacto registrado con éxito");
    },
    onError: (error) => {
      console.error("Error registrando al contacto", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleColorChange = (color) => {
    setContact((prevContact) => ({
      ...prevContact,
      color: color?.hex ? color.hex : color,
    }));
  };

  return (
    <form className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="capitalize font-bold pt-5 pb-3">add new contact</h2>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-bold ">Select Icon</span>
        </label>
        <div className="grid grid-cols-3 gap-4 ">
          {icons.map((icon, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setContact({ ...contact, icon: icon.name })}
              className={`btn btn-outline ${
                contact.icon === icon.name ? "btn-primary" : ""
              }`}
            >
              {icon.component}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-bold ">Name</span>
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
              <span className="label-text font-bold ">Phone Number</span>
            </label>
            <div className="flex items-center">
              <label className="input input-bordered flex items-center gap-2">
                <span className="font-bold">+593</span>
                <input
                  type="tel"
                  name="phone"
                  value={contact.phone}
                  onChange={handleChange}
                  placeholder="987654321"
                  className=" w-full"
                  required
                />
              </label>
            </div>
          </div>
        </div>

        <div className="form-control mb-4 ">
          <label className="label">
            <span className="label-text font-bold ">Select Color</span>
            <ColorPicker onChange={handleColorChange} />
          </label>
          <BlockPicker
            width="100%"
            colors={[
              "#68CCCA",
              "#73D8FF",
              "#AEA1FF",
              "#009CE0",
              "#7B64FF",
              "#FA28FF",
              "#1E90FF",
              "#9370DB",
              "#8A2BE2",
              "#DA70D6",
            ]}
            triangle="hide"
            color={contact.color}
            onChangeComplete={handleColorChange}
          />
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (validateContact(contact)) {
            mutate({
              _id: user.userId,
              contact: {
                name: contact.name,
                phone: contact.phone,
                color: contact.color,
                icon: contact.icon,
              },
            });
            // setPeople([...people, contact]);
            setContact({ name: "", phone: "", color: "#fff" });
          }
        }}
        type="submit"
        className="btn btn-success w-full"
      >
        Add Contact
      </button>
    </form>
  );
};

export default AddContactForm;
