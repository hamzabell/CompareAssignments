import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../store/Context";

const INITIAL_STATE = {
  username: null,
  password: null,
  isLoading: false,
};

export default ({}) => {
  const history = useHistory();
  const [loginState, setLoginState] = useState(INITIAL_STATE);
  const [state, dispatch] = useAppContext();

  const toggleIsLoading = () => {
    setLoginState((prev) => ({
      ...prev,
      isLoading: !prev.isLoading,
    }));
  };

  const handleChange = (e) => {
    setLoginState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleIsLoading();
    if (loginState.username === "admin" && loginState.password === "admin") {
      dispatch({ type: "USER_LOGGED_IN" });
      setTimeout(() => {
        history.push("/");
        toast.success("🚀 Welcome to the Platform, Admin!");
      }, 3000);
    } else {
      toggleIsLoading();
      toast.error("🧑‍🦱 Wrong username/password. Try again!");
    }
  };

  return (
    <div className="flex flex-col mt-52 md:mt-0">
      <div className="flex justify-center  md:mt-40 md:mx-20">
        <h1 className="text-gray-400 md:text-2xl text-lg uppercase">Login</h1>
      </div>
      <div className="flex justify-center  items-center md:mt-20 mt-10">
        <div className="px-5 py-8 md:w-3/12">
          <form className="md:mx-10" onSubmit={handleSubmit}>
            <div className="mb-5">
              <div className="flex">
                <FaUserAlt className="text-gray-300 w-5 h-5 mt-3 mr-3" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="border-0 border-b-2 border-black w-full h-10 pl-2"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="flex">
                <FaLock className="text-gray-300 w-5 h-5 mt-3 mr-3" />
                <input
                  placeholder="Password"
                  name="password"
                  type="password"
                  className="border-0 border-b-2 border-black w-full h-10 pl-2"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-black w-full p-3 rounded font-semibold text-lg uppercase text-white"
            >
              <span className="flex justify-center">
                Log in
                {loginState.isLoading && (
                  <Loader
                    className="ml-2"
                    type="ThreeDots"
                    color="#ffffff"
                    height={30}
                    width={30}
                  />
                )}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
