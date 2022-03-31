import React, { useState } from 'react';
import { useTable, useGlobalFilter, useSortBy } from "react-table";

import "./App.css";

export default function Table({columns, data}) {

  if (data !== undefined && data.length > 0) {

  const [filterInput, setFilterInput] = useState("");

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    } = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
  );

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setGlobalFilter(value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  let window = document.querySelector("body");
  window.style.width = "600px";

  // Render the UI for your table
  return (
    <>
      <input class="filterinput"
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={"Filter Title"}
      />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
  }
  else {
    return (
    <>
    </>
    );
  }
}