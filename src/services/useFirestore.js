import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore"
import firebaseApp from "./firebase";

const db = getFirestore(firebaseApp);
const docRef = doc(db, "users");

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

  const getUsers = async () => {
    const docSnap = await getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    });
  };

  return {
    addUser
  };
}