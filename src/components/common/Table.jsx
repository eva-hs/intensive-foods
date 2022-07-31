import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

function Table({ data, columns, sortColumn, onSort }) {
  return (
    <table className="table">
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}

export default Table;
