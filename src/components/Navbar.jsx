import { useAuth0 } from "@auth0/auth0-react";
import AddContact from "./AddContact";
const Navbar = ({ setPeople, people }) => {
  const { loginWithRedirect, loginWithPopup, isAuthenticated, user, logout } =
    useAuth0();

  return (
    <div className="navbar bg-base-100 border-b border-base-500">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <img src="/logo.png" alt="logo" width={"40%"} />
      </div>
      <dialog id="for-parents" className="modal">
        <div className="modal-box">
          <AddContact setPeople={setPeople} people={people} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="navbar-end">
        <button
          onClick={() => document.getElementById("for-parents").showModal()}
          className={`btn btn-outline btn-lg mr-36 m-2 ${
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
            className="btn btn-success btn-outline btn-lg uppercase"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};
// Navbar.propTypes = {
//   setPeople: PropTypes.func.isRequired,
//   people: PropTypes.array.isRequired,
// };

export default Navbar;
