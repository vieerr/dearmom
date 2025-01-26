//icons for the contacts
import { BlockPicker } from "react-color";
import {
  MdArrowBack,
  MdElderly,
  MdElderlyWoman,
  MdMan,
  MdWoman,
} from "react-icons/md";
import { TbManFilled, TbWomanFilled } from "react-icons/tb";

const EditContactForm = ({
  contact,
  setContact,
  validateContact,
  people,
  setPeople,
  setEditPanelVisibility,
}) => {
  const icons = [
    { icon: <MdElderly size={35} />, type: MdElderly },
    { icon: <MdElderlyWoman size={35} />, type: MdElderlyWoman },
    { icon: <MdMan size={35} />, type: MdMan },
    { icon: <MdWoman size={35} />, type: MdWoman },
    { icon: <TbManFilled size={35} />, type: TbManFilled },
    { icon: <TbWomanFilled size={35} />, type: TbWomanFilled },
  ];

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

  return (
    <form className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center ">
        <button
          className="btn btn-square btn-ghost mr-11"
          type="button"
          onClick={() => setEditPanelVisibility(false)}
        >
          <MdArrowBack size={20} />
        </button>
        <h2 className="capitalize font-bold pt-5 pb-3">
          edit contact &nbsp;
          <span style={{ color: contact.color }}>{contact.name}</span>
        </h2>
      </div>
      {!(contact.name === "dad" || contact.name === "mom") && (
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold ">Change Icon</span>
          </label>
          <div className="grid grid-cols-3 gap-4 ">
            {icons.map((icon) => (
              <button
                key={icon.type}
                type="button"
                onClick={() => setContact({ ...contact, icon: icon.icon })}
                className={`btn btn-outline ${
                  contact.icon?.type === icon.type ? "btn-primary" : ""
                }`}
              >
                {icon.icon}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          {!(contact.name === "dad" || contact.name === "mom") && (
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
          )}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Phone Number</span>
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

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-bold ">Select Color</span>
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
            const existingContactIndex = people.findIndex(
              (person) => person.name === contact.name
            );
            if (existingContactIndex !== -1) {
              const updatedPeople = [...people];
              updatedPeople[existingContactIndex] = contact;
              setPeople(updatedPeople);
            } else {
              if (
                window.confirm(
                  "Contact with this name already exists. Do you want to update it?"
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
        Edit Contact
      </button>
    </form>
  );
};

export default EditContactForm;
