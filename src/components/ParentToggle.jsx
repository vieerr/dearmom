import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
const LetterRecord = ({ setButtonsEnable, closeToggleModal }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const handleSend = (event) => {
    event.preventDefault();
    const enterPassword = document.getElementById("password-check");
    if (enterPassword.value === user.pin) {
      setButtonsEnable(true);
    } else {
      alert("Wrong password!");
      setButtonsEnable(false);
    }
    closeToggleModal();
    enterPassword.value = "";
  };

  return (
    <form className="max-w-full p-4 mx-auto bg-white rounded-lg shadow-md">
      <h4>Please insert your password to enable the panel buttons</h4>
      <label className="input input-bordered flex items-center my-2">
        <input
          id="password-check"
          type="password"
          className="w-full my-2 p-1 border-l-zinc-800"
        />
      </label>
      <button
        type="submit"
        onClick={handleSend}
        className="btn btn-success w-auto"
      >
        Enviar
      </button>
    </form>
  );
};

export default LetterRecord;
