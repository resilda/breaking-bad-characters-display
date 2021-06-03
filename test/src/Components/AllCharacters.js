import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const AllCharacters = ({ detail }) => {
  return (
    <div>
      <TableBody>
        <TableRow key={detail.char_id}>
          <TableCell>{detail.name}</TableCell>
          <TableCell>{detail.nickname}</TableCell>
          <TableCell>{detail.category}</TableCell>
          <TableCell>{detail.birthday}</TableCell>
          <TableCell>{detail.status}</TableCell>
        </TableRow>
      </TableBody>
    </div>
  );
};

export default AllCharacters;
