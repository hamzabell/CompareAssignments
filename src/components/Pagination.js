import React from "react";

export default ({ perPage, totalPage, paginate, currentPage }) => {
  const activeStyle =
    "border-0 bg-black text-white px-3 py-1 cursor-pointer hover:bg-white hover:text-black";
  const inactiveStyle =
    "border border-black px-3 py-1 cursor-pointer hover:bg-black hover:text-white";
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalPage / perPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <ul className="flex space-x-3">
        {pageNumbers.map((number, idx) => (
          <li
            key={idx}
            onClick={() => paginate(number)}
            className={number === currentPage ? activeStyle : inactiveStyle}
          >
            {number}
          </li>
        ))}
      </ul>
    </>
  );
};
