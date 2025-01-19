import Contacts from "./Contacts";

const OthersModal = ({people, sendLetter, letterRef}) => {
  return (
    <dialog id="my_modal_2" className="modal">
      <Contacts people={people} sendLetter={sendLetter} letterRef={letterRef}/>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default OthersModal;
