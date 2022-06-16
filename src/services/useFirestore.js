import { getFirestore, setDoc, doc } from "firebase/firestore"
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);

export default function useFirestore() {
  const addUser = async (fullName, userID) => {
    try {
      return await setDoc(doc(db, "users", userID), {
        userID,
        fullName,
        toDoes: {}
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return {
    addUser
  };
}