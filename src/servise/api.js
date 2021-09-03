import firebase from "firebase";
import { db } from "../servise/firebase";

export const addTodo = (content, uid) => {
  db.collection("todo").add({
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const initGet = async (uid) => {
  const todo = await db
    .collection("todo")
    .orderBy("createdAt", "desc")
    .where("uid", "==", uid);
  return todo.get().then((snapshot) => {
    let todo = [];
    snapshot.forEach((doc) => {
      todo.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return todo;
  });
};

export const todoDelete = (id) => {
  db.collection("todo").doc(id).delete();
};

export const toggleComple = async (id) => {
  const todo = await db.collection("todo").doc(id).get();
  return db
    .collection("todo")
    .doc(id)
    .update({
      isComplete: todo.data().isComplete ? false : true,
      updateAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
