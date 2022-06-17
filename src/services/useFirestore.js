import { getFirestore, setDoc, getDocs, updateDoc, collection, doc } from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);
const collectionRef = collection(db, "users");

export default function useFirestore() {
  const addUser = async (fullName) => {
    try {
      return await setDoc(collectionRef, {
        fullName,
        toDoes: {}
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

  return {
    addUser,
    getUsers,
    addToDo
  };
}