import React, { useEffect, useState } from "react";
import { useAppContext } from "../store/Context";
import service from "../services/app.service";
import { toast } from "react-toastify";
import { FiHome, FiLogOut } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Pagination, withAuthentication } from "../components";

const PAGINATION_STATE = {
  currentPage: 1,
  perPage: 5,
};

const History = ({}) => {
  let data = [];
  const [state, dispatch] = useAppContext();
  const [pgState, setPgState] = useState(PAGINATION_STATE);
  const [historyState, setHistoryState] = useState(null);
  const path = useHistory();

  useEffect(() => {
    async function populateData() {
      try {
        const { data } = await service.history();

        dispatch({ type: "POPULATE_HISTORY", payload: data });
        toast.success("🚀 History retreived successfully!");
      } catch (err) {
        toast.error("❌ An error occurred.Please try again");
      }
    }
    state.history.length === 0 && populateData();
    return () => {
      setPgState((prev) => ({ ...prev, currentPage: 1 }));
    };
  }, []);

  const lastIndex = pgState.currentPage * pgState.perPage;
  const firstIndex = lastIndex - pgState.perPage;
  if (state.history) data = state.history.slice(firstIndex, lastIndex);

  useEffect(() => {
    if (historyState) {
      path.push("/", { fromHistory: true });
    }

    return () => {
      historyState &&
        dispatch({
          type: "COMPARE_TEXTS",
          payload: historyState,
        });
    };
  }, [historyState]);

  const paginate = (number) =>
    setPgState((prev) => ({ ...prev, currentPage: number }));

  return (
    <div className="">
      <div className="flex justify-between md:mt-20 md:mx-20 mx-5 mt-10">
        <h1 className="text-gray-400 md:text-2xl text-lg uppercase">History</h1>

        <div className="md:flex space-x-2 hidden ">
          <div
            onClick={() => path.goBack()}
            className="cursor-pointer  md:flex md:justify-center border-0 bg-black text-white px-5 py-3 rounded font-semibold transform hover:scale-110 hover:font-bold pb-1"
          >
            <FiHome className="w-5 h-5 mx-3" />
            Home
          </div>

          <div
            onClick={() => path.push("/logout")}
            className="cursor-pointer  md:flex md:justify-center md:items-center  border-0 text-red-600 py-3 rounded font-semibold transform hover:underline hover:font-bold"
          >
            <FiLogOut className="w-5 h-5 mx-3 text-red-600" />
            Log Out
          </div>
        </div>

        <div className="flex space-x-3 md:hidden">
          <FiHome
            className="w-5 h-5 mr-6 text-gray-600"
            onClick={() => path.goBack()}
          />
          <FiLogOut
            className="w-5 h-5 mx-5 text-red-500"
            onClick={() => path.push("/logout")}
          />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-0">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="hidden px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider lg:table-cell">
                      #
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      StudentA
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      StudentB
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                      Similarity Score
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, idx) => (
                      <tr key={idx}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden lg:table-cell">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            {idx + 1}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm table-cell">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            {item.studentA}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm table-cell">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            {item.studentB}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden lg:table-cell">
                          <p className="text-gray-900 whitespace-no-wrap text-center">
                            {Math.round(
                              (parseInt(item.similarity) / 1000) * 100
                            )}
                            %
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div
                            className="flex justify-center"
                            onClick={() =>
                              setHistoryState({
                                id: item.id,
                                studentA: item.studentA,
                                studentB: item.studentB,
                                similarity: Math.round(
                                  (parseInt(item.similarity) / 1000) * 100
                                ),
                                similarParagraphs: item.similarParagraphs,
                              })
                            }
                          >
                            <FaEye className="w-5 h-5 text-black cursor-pointer" />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {data.length === 0 && (
                <div
                  className="flex justify-center my-5
                "
                >
                  No data available
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <Pagination
              perPage={10}
              totalPage={30}
              paginate={paginate}
              currentPage={pgState.currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuthentication(History);
