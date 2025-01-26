import Contacts from "./Contacts";

const OthersModal = ({
  setAudio,
  setAddressee,
  people,
  sendLetter,
  letterRef,
}) => {
  return (
    <dialog id="my_modal_2" className="modal">
      <Contacts
        setAudio={setAudio}
        setAddressee={setAddressee}
        people={people.filter(
          (person) => person.name !== "mom" && person.name !== "dad"
        )}
        sendLetter={sendLetter}
        letterRef={letterRef}
      />
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default OthersModal;
