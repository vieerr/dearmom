// src/components/LoginModal.jsx
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { login } = useContext(AuthContext);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationKey: "login",
    mutationFn: login,
    onSuccess: () => {
      // console.log("Login successful");
      onClose();
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (password.length === 0) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      mutate({ email, password });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <button
            onClick={() => onClose()}
            className="btn btn-sm btn-circle btn-ghost "
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaEnvelope className="absolute right-3 top-3 text-gray-400" />
            </div>
            {errors.email && (
              <span className="text-xs text-error">{errors.email}</span>
            )}
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="absolute right-3 top-3 text-gray-400" />
            </div>
            {errors.password && (
              <span className="text-xs text-error">{errors.password}</span>
            )}
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        {isError && (
          <div className="text-error text-sm mt-4">{error.message}</div>
        )}
        <div className="mt-4 text-center">
          <span className="text-sm">{"Don't have an account?"} </span>
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={onSwitchToRegister}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
