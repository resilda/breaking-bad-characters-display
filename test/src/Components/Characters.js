import React, { useEffect, useContext } from "react";
import firebase from "../Config/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchData } from "../Redux/data/dataActions";
import { Button } from "@material-ui/core";
import { AuthContext } from "../Auth/AuthService";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableHeader from "./TableHeader";
import AllCharacters from "./AllCharacters";

const Characters = () => {
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);
  const info = useSelector((state) => state.data.info);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const history = useHistory();

  //use the context created in "AuthService.js" file, to remove the token in case of logOut
  const context = useContext(AuthContext);

  const handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        context.logOut();
        history.push("/login");
      });
  };

  return (
    <div>
      <h1 style={{ color: "rebeccapurple" }}>CHARACTERS PAGE</h1>
      <Button
        onClick={handleLogOut}
        variant="contained"
        color="secondary"
        style={{ marginTop: "10px" }}
      >
        Log out
      </Button>
      <Paper>
        <Table>
          <TableHead>
            <TableHeader />
          </TableHead>
          <TableBody>
            <div>
              {loading ? (
                <h4>Loading...</h4>
              ) : error ? (
                <h4>{error}</h4>
              ) : (
                info.map((detail) => (
                  <div key={detail.char_id}>
                    <AllCharacters detail={detail} />
                  </div>
                ))
              )}
            </div>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default Characters;
