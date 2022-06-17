import {
  doc,
  setDoc,
  getDocs,
  updateDoc,
  increment,
  collection,
  getFirestore
} from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);
const collectionRef = collection(db, "users");

export default function useFirestore() {
  const addUser = async (fullName) => {
    try {
      return await setDoc(collectionRef, {
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
    handleStatus
  };
}