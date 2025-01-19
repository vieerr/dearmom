import { useState } from "react";

const AddContact = ({ people, setPeople }) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact added:", contact);
    setPeople([...people, contact]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md p-4 mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center uppercase ">registered contacts</h2>

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
          <span className="input input-bordered h-full  bg-gray-200 text-center">
            +593
          </span>
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            placeholder="987654321"
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>
      <button onClick={()=>document.getElementById("for-parents").close()}  type="submit" className="btn btn-primary w-full">
        Add Contact
      </button>
    </form>
  );
};

export default AddContact;
