import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  increment,
  deleteDoc,
  collection,
  deleteField,
  getFirestore
} from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);

export default function useFirestore() {
  const addUser = async (userID, fullName) => {
    try {
      return await setDoc(doc(db, "users", userID), {
        fullName,
        toDoes: {},
        completed: 0
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUsers = async () => {
    const result = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((document) => {
      result.push({ id: document.id, ...document.data() });
    });

    return result;
  };

  const deleteUser = async (userID) => {
    await deleteDoc(doc(db, "users", userID));
  };

  const addToDo = async (userID, todo, allToDoes) => {
    const userRef = doc(db, "users", userID);
    await updateDoc(userRef, {
      toDoes: {
        ...allToDoes,
        [todo.id]: todo
      }
    });
  };

  const deleteToDo = async (userID, todoID, status) => {
    const userRef = doc(db, "users", userID);

    if (status) {
      await updateDoc(userRef, {
        completed: increment(-1),
        [`toDoes.${todoID}`]: deleteField()
      });
    } else {
      await updateDoc(userRef, {
        [`toDoes.${todoID}`]: deleteField()
      });
    }
  };

  const updateToDo = async (userID, todo, text) => {
    const userRef = doc(db, "users", userID);
    await updateDoc(userRef, {
      [`toDoes.${todo.id}`]: {
        ...todo,
        title: text
      }
    });
  };

  const handleStatus = async (userID, todo) => {
    const userRef = doc(db, "users", userID);
    await updateDoc(userRef, {
      completed: increment(1),
      [`toDoes.${todo.id}`]: {
        ...todo,
        isDone: true
      }
    });
  };

  return {
    addToDo,
    addUser,
    getUsers,
    deleteUser,
    updateToDo,
    deleteToDo,
    handleStatus
  };
}