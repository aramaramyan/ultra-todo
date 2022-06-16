import { getFirestore, setDoc, getDocs, collection, doc } from "firebase/firestore";
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);
const docRef = doc(db, "users");

export default function useFirestore() {
  const addUser = async (fullName) => {
    try {
      return await setDoc(docRef, {
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

  return {
    addUser,
    getUsers
  };
}