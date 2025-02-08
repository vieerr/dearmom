import { useState } from "react";
//icons for the contacts
import { MdElderly, MdElderlyWoman, MdMan, MdWoman } from "react-icons/md";
import { TbManFilled, TbWomanFilled } from "react-icons/tb";
import { BlockPicker } from "react-color";
import ColorPicker from "./ColorPicker";

const AddContactForm = ({ validateContact, people, setPeople }) => {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    color: "#fff",
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
      color: color.hex,
    }));
  };

  const handleColorPicker = (selectedColor) => {
    setContact((prevContact) => ({
      ...prevContact,
      color: selectedColor
    }));
  };

  // const validateContact = () => {
  //   const nameRegex = /^[A-Za-z\s]+$/;
  //   const phoneRegex = /^\d{9}$/;

  //   if (!nameRegex.test(contact.name)) {
  //     alert("Name should contain only letters.");
  //     return false;
  //   }

  //   if (!phoneRegex.test(contact.phone)) {
  //     alert("Phone number should contain exactly 9 digits.");
  //     return false;
  //   }

  //   if (!contact.icon) {
  //     alert("Please select an icon.");
  //     return false;
  //   }

  //   return true;
  // };

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
            <ColorPicker onChange={handleColorPicker}/>
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
            setPeople([...people, contact]);
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
