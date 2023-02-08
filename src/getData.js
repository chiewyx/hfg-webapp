import { doc, getDoc, collection, getDocs } from "firebase/firestore";
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

const readData = async (name) => {
  const colRef = collection(db, name);
  try {
    const docsSnap = await getDocs(colRef);
    if(docsSnap.docs.length > 0) {
       docsSnap.forEach(doc => {
          console.log(doc.data());
       })
    }
} catch (error) {
    console.log(error);
}
}

export {getReview,
readData
}