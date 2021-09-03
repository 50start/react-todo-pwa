import React, { useState, useEffect, useContext } from "react";
import { signInWithGoogle } from "../servise/firebase";
import dig from "object-dig";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../providers/AuthProvider";
import * as Api from "../servise/api";
import { ToDoList } from "./ToDoList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
    marginTop: 40,
  },
  form: {
    width: "100%",
    maxWidth: 360,
    margin: "auto",
    marginBottom: 40,
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
  },
  input: {
    marginRight: 10,
  },
}));

export const Dashboard = () => {
  const classes = useStyles();
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState("");
  const [todos, setTodos] = useState([]);
  console.log(inputName);
  console.log(todos);

  useEffect(() => {
    //TODO一覧取得
    fetch();
  }, [currentUser]);

  const fetch = async () => {
    // currentUserの中のcurrentUserのuidがあった場合fetchの動きをとる
    if (dig(currentUser, "currentUser", "uid")) {
      const data = await Api.initGet(currentUser.currentUser.uid);
      await setTodos(data);
    }
  };

  const formRender = () => {
    let dom;
    if (dig(currentUser, "currentUser", "uid")) {
      dom = (
        <form className={classes.form}>
          <TextField
            className={classes.input}
            placeholder="ToDoName"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            disabled={inputName.length > 0 ? false : true}
            type="button"
            onClick={() => post()}
          >
            追加
          </Button>
        </form>
      );
    } else {
      dom = <button onClick={signInWithGoogle}>ログイン</button>;
    }
    return dom;
  };
  const post = async () => {
    await Api.addTodo(inputName, currentUser.currentUser.uid);
    await setInputName("");
    fetch();
  };

  return (
    <div className={classes.root}>
      {formRender()}
      <ToDoList todos={todos} fetch={fetch} />
    </div>
  );
};
