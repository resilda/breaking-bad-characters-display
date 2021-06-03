import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const TableHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
      }}
    >
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Nickname</TableCell>
        <TableCell>Category</TableCell>
        <TableCell>Birthday</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
    </div>
  );
};

export default TableHeader;
