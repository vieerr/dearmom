import Contacts from "./Contacts";

const OthersModal = () => {
  return (
    <dialog id="my_modal_2" className="modal">
      <Contacts />
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default OthersModal;
