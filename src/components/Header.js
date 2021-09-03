import React, { useContext } from "react";
import { signInWithGoogle, logOut } from "../servise/firebase";
import { AuthContext } from "../providers/AuthProvider";
import dig from "object-dig";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: "space-between",
  },
  button: {
    color: "#FFF",
  },
}));

export const Header = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);
  //もしログインしていたら
  const classes = useStyles();
  const buttonRender = () => {
    let buttonDom;
    if (dig(currentUser, "currentUser", "uid")) {
      // if(currentUser.currentUser) =>中身は存在しない　エラーが出る
      // currentUser.currentUser.Dm.○○
      buttonDom = (
        <Button className={classes.button} variant="inherit" onClick={logOut}>
          ログアウト
        </Button>
      );
      //もしログインしていなかったら
    } else {
      buttonDom = (
        <Button
          className={classes.button}
          variant="inherrit"
          onClick={signInWithGoogle}
        >
          ログイン
        </Button>
      );
    }
    return buttonDom;
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">ReactToDo</Typography>
        {buttonRender()}
      </Toolbar>
    </AppBar>
  );
};
