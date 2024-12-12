import { TbManFilled, TbWomanFilled } from "react-icons/tb";

const Contacts = () => {
  return (
      <div className="modal-box">
        <h3 className="font-bold text-lg">Other contacts</h3>
        <div className="flex flex-col gap-5 p-7">
          <button className="btn">
            <TbManFilled size={35} className="inline-block" /> Brother
          </button>
          <button className="btn">
            <TbWomanFilled size={35} className="inline-block" /> Sister
          </button>
        </div>
      </div>
  );
};

export default Contacts;
