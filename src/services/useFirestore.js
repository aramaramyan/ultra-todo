import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  increment,
  deleteDoc,
  collection,
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

  const handleStatus = async (userID, todo, status, number) => {
    const userRef = doc(db, "users", userID);
    await updateDoc(userRef, {
      completed: increment(number),
      [`toDoes.${todo.id}`]: {
        ...todo,
        isDone: status
      }
    });
  };

  return {
    addToDo,
    addUser,
    getUsers,
    deleteUser,
    handleStatus
  };
}