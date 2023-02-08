import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";


//name is either S3Mur4yOTYsjtzOew0Ls or rc4
//docSnap.data() is the data

const getReview = async (name) => {

  const docRef = doc(db, "reviews", name);
  try {
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        console.log(docSnap.data());
    } else {
        console.log("Document does not exist")
    }

  } catch(error) {
    console.log(error)
  }
}

export {getReview}