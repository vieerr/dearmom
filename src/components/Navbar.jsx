import { useAuth0 } from "@auth0/auth0-react";
import EditContact from "./EditContact";
import LetterRecord from "./LetterRecord";
const Navbar = ({ setPeople, people, setLetters, letters }) => {
  const { loginWithRedirect, loginWithPopup, isAuthenticated, user, logout } =
    useAuth0();

  return (
    <div className="navbar bg-base-100 border-b border-base-500">
      <div className="navbar-start">
        <img
          src="/logo.png"
          alt="logo"
          className="w-36 inline-block"
          width={"100%"}
        />
      </div>
      <dialog id="for-parents" className="modal">
        <div className="modal-box pt-9">
          <form method="dialog">
            {}
            <button className="btn-sm btn-circle btn-ghost absolute top-1 right-1">✕</button>
          </form>
          <EditContact setPeople={setPeople} people={people} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <dialog id="letter-record" className="modal">
        <div className="modal-box pr-0">
          <form method="dialog">
            {}
            <button className="btn-sm btn-circle btn-ghost absolute top-1 right-1">✕</button>
          </form>
          <LetterRecord setLetters={setLetters} letters={letters}/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="navbar-end">
        <button
          onClick={() => document.getElementById("letter-record").showModal()}
          className={`btn btn-outline md:btn-lg md:mr-36 m-2 ${
            !isAuthenticated && "btn-disabled"
          }`}
        >
          RECORD
        </button>
        <button
          onClick={() => document.getElementById("for-parents").showModal()}
          className={`btn btn-outline md:btn-lg md:mr-36 m-2 ${
            !isAuthenticated && "btn-disabled"
          }`}
        >
          FOR PARENTS
        </button>
        {isAuthenticated ? (
          <div className="flex flex-col items-center justify-center">
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-12 rounded-full mb-3">
                <img alt="User profile picture" src={user.picture} />
              </div>
            </div>
            <button
              onClick={() =>
                logout({
                  logoutParams: {
                    returnTo: window.location.origin,
                  },
                })
              }
              className="btn btn-sm btn-error btn-outline"
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            className="btn btn-success btn-outline md:btn-lg uppercase"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
