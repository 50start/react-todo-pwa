import React, { useState, useEffect, useContext } from "react";
import { signInWithGoogle } from "../servise/firebase";
import dig from "object-dig";
import { AuthContext } from "../providers/AuthProvider";
import * as Api from "../servise/api";
import { makeStyles } from "@material-ui/core";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 360,
    margin: "auto",
  },
  ul: {
    paddingLeft: 0,
    listStyle: "none",
  },
  list: {
    justifyContent: "space-between",
  },
}));

export const ToDoList = (props) => {
  const classes = useStyles();
  const deleteHandle = async (id) => {
    await Api.todoDelete(id);
    props.fetch();
  };

  const checkHandle = async (id) => {
    //Api経由でisCompelteの値を更新
    await Api.toggleComple(id);
    props.fetch();
  };

  const todoList = props.todos.map((todo) => {
    return (
      <ListItem key={todo.id}>
        <ListItemIcon>
          　
          <Checkbox
            checked={todo.isComplete}
            onChange={() => checkHandle(todo.id)}
          />
        </ListItemIcon>
        <ListItemText
          primary={todo.content}
          //secondary={secondary ? 'Secondary text' : null}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => deleteHandle(todo.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  });
  return (
    <div className={classes.root}>
      <h2>TODOリスト</h2>
      <ul className={classes.ul}>{todoList}</ul>
    </div>
  );
};
