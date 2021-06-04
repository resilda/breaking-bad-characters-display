import React, { useEffect, useContext } from "react";
import firebase from "../Config/Firebase";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchData } from "../Redux/data/dataActions";
import { AuthContext } from "../Auth/AuthService";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableHeader from "./TableHeader";
import AllCharacters from "./AllCharacters";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 1500,
  },
}));

const Characters = () => {
  const classes = useStyles();

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          margin: "30px",
        }}
      >
        <h1
          style={{
            color: "rebeccapurple",
            fontSize: "28px",
            marginLeft: "180px",
          }}
        >
          BREAKING BAD
        </h1>
        <Button
          onClick={handleLogOut}
          variant="contained"
          color="secondary"
          style={{
            marginRight: "30px",
          }}
        >
          Log out
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Paper
          className={classes.root}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Table className={classes.table}>
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
    </div>
  );
};

export default Characters;
