import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useAppContext } from "../store/Context";

const CompareTexts = () => {
  const [state, dispatch] = useAppContext();

  const handleChange = (e) => {
    dispatch({
      type: "COMPARE_TEXTS",
      payload: { [e.target.name]: e.target.value },
    });
  };

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-10 block">
        <div className="flex flex-col">
          <div>
            <div className="flex flex-col">
              <label className="text-gray-700">Student A's Name</label>
              <input
                type="text"
                name="studentA"
                onChange={handleChange}
                value={state.current.studentA}
                className="border border-black md:w-1/2 h-10 pl-2 rounded"
              />
            </div>
            <div className="flex justify-center items-center py-20 pl-4  border-dashed border border-gray-300 rounded md:w-1/2 mt-6">
              <input type="file" id="file" aria-label="File browser example" />
            </div>
          </div>

          <div className="mt-10">
            <div className="flex flex-col">
              <label className="text-gray-700">Student B's Name</label>
              <input
                name="studentB"
                onChange={handleChange}
                value={state.current.studentB}
                type="text"
                className="border border-black md:w-1/2 h-10 pl-2 rounded"
              />
            </div>
            <div className="flex justify-center items-center py-20 pl-4  border-dashed border border-gray-300 rounded md:w-1/2 mt-6">
              <input type="file" id="file" aria-label="File browser example" />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-10 md:mt-0">
          <div className="uppercase text-center p-2 rounded border border-black">
            Analysis
          </div>
          <div className="mt-7">
            <div className="flex  flex-col items-center">
              <h3 className="uppercase text-gray-700 mb-3">Similarity Score</h3>
              <CircularProgressbar
                value={state.current.similarity || 0}
                text={`${state.current.similarity || 0}%`}
                className="w-40 h-40"
              />
            </div>
            <div className="mt-7 flex  flex-col items-center">
              <h3 className="uppercase text-gray-700 mb-3">Similar Texts</h3>
              {state.current.similarParagraphs.length === 0 && (
                <div className="text-gray-600">No Similar Texts Found</div>
              )}
              {state.current.similarParagraphs && (
                <>
                  <ul>
                    {state.current.similarParagraphs.map((item, idx) => {
                      if (idx <= 5) {
                        return (
                          <li key={idx} className="m-5 text-left">
                            {idx + 1}.
                            <span className="bg-yellow-200 m-3">{item}</span>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareTexts;
