import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { withAuthentication } from "../components";
import { useAppContext } from "../store/Context";
import { CompareTextComponent } from "../components";
import { INITIAL_STATE } from "../store/StateDefs";
import service from "../services/app.service";
import { toast } from "react-toastify";

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const [state, dispatch] = useAppContext();
  const [clearState, setClearState] = useState(false);

  const reRun = async () => {
    try {
      const data = await service.rerun(state.current.id);
      dispatch({
        type: "RERUN",
        payload: {
          id: data.id,
          similarity: data.similarity,
          similarParagraphs: data.similarParagraphs,
        },
      });
    } catch (err) {
      toast.error("An Error occurred while running this query");
    }
  };

  const compare = async () => {
    try {
      const data = await service.compareTexts(
        state.current.studentA,
        state.current.studentB
      );
      data &&
        dispatch({
          type: "COMPARE",
          payload: {
            id: data.id,
            studentA: state.current.studentA,
            studentB: state.current.studentB,
            similarity: data.similarity,
            similarParagraphs: data.similarParagraphs,
          },
        });
    } catch (err) {
      toast.error("An Error occurred while running this query");
    }
  };
  console.log(location);

  console.log(location.state, clearState);
  return (
    <div className="mb-10">
      <div className="flex justify-between md:mt-20 md:mx-20 mx-5 mt-10">
        <h1 className="text-gray-400  md:text-2xl text-lg uppercase text-wrap">
          Compare Assignments
        </h1>

        <div className="md:flex space-x-2 hidden ">
          {(clearState || !location.state) && (
            <button
              onClick={() => compare()}
              className="cursor-pointer  md:flex md:justify-center md:items-center border-0 bg-black text-white px-5 rounded font-semibold transform hover:scale-110 hover:font-bold pb-1"
            >
              <BiGitCompare className="w-5 h-5 mx-3 text-white" />
              Compare
            </button>
          )}

          {location.state && !clearState && (
            <button
              onClick={() => reRun()}
              className="cursor-pointer  md:flex md:justify-center md:items-center border border-green-500 text-green-500 px-5 rounded font-semibold transform hover:scale-110 hover:font-bold pb-1"
            >
              <FaPlay className="w-5 h-5 mx-2 text-green-500" />
              Rerun
            </button>
          )}
          <button
            onClick={() => {
              setClearState(true);
              dispatch({
                type: "COMPARE_TEXTS",
                payload: INITIAL_STATE.current,
              });
            }}
            className="cursor-pointer  md:flex md:justify-center md:items-center border border-blue-500 text-blue-500 px-5 rounded font-semibold transform hover:scale-110 hover:font-bold pb-1"
          >
            <MdClear className="w-5 h-5 mx-2 text-blue-500" />
            Clear
          </button>

          <div
            onClick={() => history.push("/history")}
            className="cursor-pointer  md:flex md:justify-center md:items-center border border-black text-black px-5 rounded font-semibold transform hover:scale-110 hover:font-bold"
          >
            <FaHistory className="w-5 h-5 mx-3 text-black" />
            History
          </div>
          <div
            onClick={() => history.push("/logout")}
            className="cursor-pointer  md:flex md:justify-center md:items-center  border-0 text-red-600 py-3 rounded font-semibold transform hover:underline hover:font-bold"
          >
            <FiLogOut className="w-5 h-5 mx-3 text-red-600" />
            Log Out
          </div>
        </div>

        <div className="flex space-x-4 md:hidden mt-1">
          {(clearState || !location.state) && (
            <BiGitCompare
              className="w-5 h-5  text-black"
              onClick={() => compare()}
            />
          )}
          <FaHistory
            className="w-5 h-5  text-black"
            onClick={() => history.push("/history")}
          />
          {location.state && !clearState && (
            <FaPlay
              className="w-5 h-5 mx-2 text-green-500"
              onClick={() => reRun()}
            />
          )}
          <MdClear
            className="w-5 h-5 mx-2 text-blue-500"
            onClick={() => {
              setClearState(true);
              dispatch({
                type: "COMPARE_TEXTS",
                payload: INITIAL_STATE.current,
              });
            }}
          />
          <FiLogOut
            className="w-5 h-5   text-red-500"
            onClick={() => history.push("/logout")}
          />
        </div>
      </div>

      <div className="mt-10 mx-20">
        <CompareTextComponent />
      </div>
    </div>
  );
};

export default withAuthentication(Home);
