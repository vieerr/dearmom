import { useContext } from "react";
import EditContact from "./EditContact";
import LetterRecord from "./LetterRecord";
import ParentToggle from "./ParentToggle";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useState, useRef } from "react";
import { AuthContext } from "./AuthProvider";
import { useEffect } from "react";
const Navbar = ({ setPeople, people, setLetters, letters }) => {
  const { authToken, logout, refetch } = useContext(AuthContext);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [buttonsEnable, setButtonsEnable] = useState(()=>
  {
    const enabled = localStorage.getItem("buttonsEnable");
    return JSON.parse(enabled) ?? true;
  });
  const toggleModalRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("buttonsEnable", JSON.stringify(buttonsEnable));
  }, [buttonsEnable]);

  useEffect(() => {
    if (authToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [authToken]);

  const closeToggleModal = () => {
    if (toggleModalRef.current) {
      toggleModalRef.current.close();
    }
  };

  const handleToggleChange = (event) => {
    if (!buttonsEnable) {
      document.getElementById("toggle-pannel-buttons").showModal();
      if (!buttonsEnable) {
        event.preventDefault();
        setButtonsEnable(false);
      }
    } else {
      setButtonsEnable(false);
    }
  };

  return (
    <>
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      <div className="w-full flex md:hidden">
        <img
          src="/logo.png"
          alt="logo"
          className="w-1/2 mx-auto py-2 inline-block"
          width={"100%"}
        />
      </div>
      <div className="navbar bg-base-100 border-b border-base-500 ">
        <div className=" hidden md:block">
          <img
            src="/logo.png"
            alt="logo"
            className="w-48 inline-block"
            width={"100%"}
          />
        </div>
        <dialog id="for-parents" className="modal">
          <div className="modal-box pt-9">
            <form method="dialog">
              {}
              <button className="btn-md btn-circle btn-ghost absolute top-1 right-1">
                ✕
              </button>
            </form>
            <EditContact setPeople={setPeople} people={people} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog id="letter-record" className="modal">
          <div className="modal-box  px-0">
            <form method="dialog">
              <button className="btn-md btn-circle btn-ghost absolute top-1 right-1">
                ✕
              </button>
            </form>
            <LetterRecord setLetters={setLetters} letters={letters} />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <dialog
          id="toggle-pannel-buttons"
          className="modal"
          ref={toggleModalRef}
        >
          <div className="modal-box pt-9">
            <form method="dialog">
              {}
              <button className="btn-md btn-circle btn-ghost absolute top-1 right-1">
                ✕
              </button>
            </form>
            <ParentToggle
              setButtonsEnable={setButtonsEnable}
              closeToggleModal={closeToggleModal}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <div className="flex justify-evenly w-full md:justify-end ">
          <div className={`flex ${!isAuth && "hidden"}`}>
            <label className="p-2 hidden md:inline">
              For Parents:
              <span
                className={` ml-3 ${
                  buttonsEnable ? "text-success" : "text-error"
                }`}
              >
                {`${buttonsEnable ? "ON" : "OFF"}`}
              </span>
            </label>
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  disabled={!isAuth && true}
                  onChange={handleToggleChange}
                  checked={buttonsEnable}
                />
              </label>
            </div>
          </div>

          <button
            onClick={() => document.getElementById("letter-record").showModal()}
            className={`btn btn-md btn-outline md:btn-lg m-2 ${
              (!isAuth || !buttonsEnable) && "btn-disabled"
            }`}
          >
            RECORD
          </button>
          <button
            onClick={() => {
              refetch();
              document.getElementById("for-parents").showModal();
            }}
            className={`btn btn-md btn-outline md:btn-lg m-2 ${
              (!isAuth || !buttonsEnable) && "btn-disabled"
            }`}
          >
            FOR PARENTS
          </button>
          {isAuth ? (
            <div className="flex flex-col items-center justify-evenly md:justify-center">
              <div tabIndex={0} role="button" className="avatar">
                {/* <div className="w-full flex justify-center rounded-full mb-3">
                  <FaUser size={20} />
                </div> */}
              </div>
              <button
                onClick={() => logout()}
                className={`btn btn-md md:btn-lg uppercase btn-error btn-outline mx-4 ${
                  !buttonsEnable && "btn-disabled"
                }`}
              >
                Log out
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary btn-md md:btn-lg uppercase font-bold "
              onClick={() => setIsLoginModalOpen(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
